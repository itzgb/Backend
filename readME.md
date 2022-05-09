

apis

##public routes

    -login/signup
        -/login
        -/signup
        -/admin/login
        -/seller/signup
        -seller/login
    -genre
        -/genre                 list all genres
        -/genre/:id             list all books related to that genre
    
    -book
        -/book/:id                  get book by id
    
    -cart
        -/cart/add/:id              add to cart a book
        -/cart/edit/:id             edit book in cart
        -/cart/delete/:id           delete cart book
        -/cart/view                 list all cart items

    -checkout
        -/checkout                  final display of all products to be ordered and get shipping address
            -send an invoice to the mail 
    -payment
        -.payment/gateway
    -order
        -/order/add
        -/order/view
        -/order/delete
##admin routes
    -users
    -books
    -genres
    -orders
##seller routes                         all routes specific to seller
    -/seller/book   (unique)
        -/seller/addbook
        -/seller/editbook
        -/seller/deletebook
        -/seller/viewAllbook                
    -/seller/genre
        -/seller/viewgenre
        -/seller/editgenre
        -/seller/deletegenre
        -/seller/addgenre                               (not specific to seller)

##book
    -/book/:id                          get a book my id
    -/book/getAll                       get all books
##genre
    -/genre/:id                         get all book related to that genre
    -/genre/getAll                      get all genres

##cart
    -/cart/add/:id
    -/cart/edit/:id
    -/cart/delete/:id
    -/cart/view                            lists all cart items
##order
    -/order/add/:id
    -/order/getAll
    -/order/edit/:id
    -/order/delete/id




#cart
    {
        cart_id : auto generated
        user_id: user_id,
        book_id: book_id,
        quantity: quan,
        total: total

    }