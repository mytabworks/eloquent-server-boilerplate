import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    CLIENT = "client"
}

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column("varying character" , { nullable: true })
    profile_img: string | null;

    @Column()
    password: string;

    @Column()
    token_version: number;

    @Column("simple-array")
    roles: string[]

    @Column("int")
    created_at: number;

    @Column("int")
    updated_at: number;

}
