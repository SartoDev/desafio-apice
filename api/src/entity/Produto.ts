import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from "typeorm"

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column("double")
    valorVenda: number
}