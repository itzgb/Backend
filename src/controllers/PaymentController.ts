import { Request, Response } from "express";
import { getRepository, UsingJoinTableOnlyOnOneSideAllowedError } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";
import {Userroles} from '../config/config';
import { AppDataSource } from "../data-source";
import { UserRoles } from "../entity/UserRoles";
import { Book } from "../entity/Book";
import { Order } from "../entity/Order";
import { Address } from "../entity/Address";
//import stripe from "stripe";


import{public_key } from '../config/config';
const Stripe = require("stripe");
const stripe = Stripe('sk_test_51Kvff6SDt228OUuvgarp9wnAKC3o8puliO3LkG3WvgVdIkUdrIrOKM5lOMhSNmiMlhDG2sfRH7b0s1vLMimqQKdM00k30WgzTu');
const endpointSecret = 'whsec_d2711b47ce5d023c0e91de709f6d9accbc6087367334536ee946260b4a5f42a2';
export default class PaymentController{

    static pay = async(req:Request , res: Response) =>{
        
        console.log(req.body.cartItems,res.locals.jwtPayload.userId);
        let coupon_id;
        try{
          const coupon = await stripe.coupons.create({percent_off: 20, duration: 'once' , currency: 'inr'})
          coupon_id=coupon.id
        }catch(err){
          console.log(err)
        }
        

        console.log("coupon ",coupon_id)
        try{

          const promotionCode = await stripe.promotionCodes.create({
            coupon: coupon_id,
            code: 'VIPCODE',
          });
        }catch(err){
          console.log("Prormo code",err);
        }

        const customer = await stripe.customers.create({
          metadata:{
            userId : res.locals.jwtPayload.userId,
            //cart:JSON.stringify(req.body.cartItems)
          }
        });
        const line_items = req.body.cartItems.map((item) => {
            return {
              price_data: {
                currency: "inr",
                product_data: {
                  name: item.book_id.title,
                  images: [item.book_id.imgurl],
                  description: item.book_id.desc,
                  metadata: {
                    id: item.book_id.id,
                  },
                },
                unit_amount: item.book_id.price * 100,
              },
              quantity: item.quantity,
            };
          });

        const session = await stripe.checkout.sessions.create({
            /*line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: 'T-shirt',
                  },
                  unit_amount: 2000,
                },
                quantity: 1,
              },
            ]*/
            payment_method_types: ["card"],
                shipping_address_collection: {
                    allowed_countries: ["IN"],
                    },
                shipping_options: [
                    {
                        shipping_rate_data: {
                            type: "fixed_amount",
                                fixed_amount: {
                                    amount: 0,
                                    currency: "inr",
                                },
                            display_name: "Free shipping",
                            // Delivers between 5-7 business days
                            delivery_estimate: {
                                minimum: {
                                    unit: "business_day",
                                    value: 5,
                                },
                                maximum: {
                                    unit: "business_day",
                                    value: 7,
                                },
                            },
                        },
                    }],
            line_items
            ,
            customer : customer.id,
            phone_number_collection: {
              enabled: true,
            },
            mode: 'payment',
            allow_promotion_codes: true,
            success_url: 'http://localhost:3000/payment/success',
            cancel_url: 'http://localhost:3000/cancel',
          });
        
          res.send({url: session.url});
    }

    static webhook = async (request:Request , response: Response) => {
      let event = request.body;
      const createOrder = async (cust , datas) =>{
        const userId = cust.metadata.userId;
        let cartItems ;
        const UserRespository = AppDataSource.getRepository(User);
        const userdata = await UserRespository.findOne({
          where:{id:userId},
          relations:["cart_books"]
        })
          .then(result=>{
            console.log(result);
            cartItems = result.cart_books;
          })
          .catch(err=>console.log(err))
        const total = datas.total_amount;
        const delivery_number = datas.cust_details.phone; 
        //const bookId = cart.book_id;
        //const userId = user.id;
        const address:any =    {
           city: datas.cust_details.address.city,
          country : datas.cust_details.address.country,
          line1 : datas.cust_details.address.line1,
          line2 : datas.cust_details.address.line2,
          postal_code:datas.cust_details.address.postal_code,
          state:datas.cust_details.address.state,
          total:2
        }; 
        
        const OrderRespository = AppDataSource.getRepository(Order);
        
        cartItems[0].subtotal = 5;
        let orderDetails:any = []
        try{

          cartItems.map((item)=>{
            const book_id=item.id;
            const quantity=item.quantity;
            const subtotal= (item.quantity) * (item.price) || 5;
            orderDetails.push({book_id,quantity,subtotal});
          })
        }catch(err){console.log(err)}

        let order = new Order();
        order.addr_id = address;
        order.order_details_id = orderDetails;
        order.user_id = userId;
        order.total = total ;
        order.delivery_number = delivery_number;
       

        try{
          console.log('Order test',order);
          await OrderRespository.save(order);
        }catch(err){console.log(err)}
      }

      
      if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature'];
        try {
          event = stripe.webhooks.constructEvent(
            request.body,
            signature,
            endpointSecret
          );
        } catch (err) {
          console.log(`⚠️  Webhook signature verification failed.`, err.message);
          return response.sendStatus(400);
        }
      }
    
      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`,paymentIntent);
          // Then define and call a method to handle the successful payment intent.
          // handlePaymentIntentSucceeded(paymentIntent);
          break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
          case 'checkout.session.completed':
              console.log(event.data.object)
              console.log(event.data.object.customer_details)
              let data = {
                "cust_details":event.data.object.customer_details,
                "total_amount":event.data.object.amount_total,
                "phone":event.data.object.phone
              }
              let cust = event.data.object.customer; 
              stripe.customers
              .retrieve(cust)
              .then(async (customer) => {
                try {
                  // CREATE ORDER
                  createOrder(customer, data);
                } catch (err) {
                  console.log(typeof createOrder);
                  console.log(err);
                }
              })
              .catch((err) => console.log(err.message));
      
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }
    
      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
}

