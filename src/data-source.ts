import "reflect-metadata"
import { DataSource } from "typeorm"
import { Address } from "./entity/Address"
import { Book } from "./entity/Book"
import { BookGenre } from "./entity/BookGenre"
import { Cart } from "./entity/Cart"
import { Order } from "./entity/Order"
import { OrderDetails } from "./entity/OrderDetails"
import { User } from "./entity/User"
import {UserRoles} from "./entity/UserRoles"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "nodedb",
    synchronize: true,
    logging: false,
    entities: [User , UserRoles , Book , BookGenre , Cart , Order , Address ,OrderDetails],
    migrations: ["src/migration/*.ts"],
    
})
