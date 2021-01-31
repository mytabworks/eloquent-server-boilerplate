import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("activities")
export class Activity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    description: string;

    @Column("int")
    created_at: number;

    @Column("int")
    updated_at: number;

}
