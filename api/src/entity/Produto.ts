import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne, BaseEntity } from "typeorm"

@Entity()
export class Produto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({type: "numeric", precision: 10, scale: 2,})
    valor: number
}