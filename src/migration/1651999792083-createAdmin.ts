import { MigrationInterface, QueryRunner } from "typeorm"
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Userroles } from "../config/config";
import { UserRoles } from "../entity/UserRoles";
export class createAdmin1651999792083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let user = new User();
    user.username = "admin";
    user.password = "admin";
    user.email = "admin@admin.com";
    user.mobile = "+919090908888";
    user.hashPassword();
    const UserRolesRepository = AppDataSource.getRepository(UserRoles);  
    let roles = await UserRolesRepository.save({role:Userroles.ADMIN});
    user.userrole = roles;
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
