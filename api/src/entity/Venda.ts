import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from "typeorm"
import { Pessoa } from "./Pessoa"

@Entity()
export class Venda {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'date' })
    dataVenda: string
    
    @JoinColumn()
    pessoa: Pessoa
}