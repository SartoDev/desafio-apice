import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from "typeorm"
import { Cidade } from "./Cidade"
import { Bairro } from "./Bairro"

@Entity()
export class Pessoa {
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => Bairro)
    @JoinColumn()
    bairro: Bairro

    @ManyToOne(() => Cidade)
    @JoinColumn()
    cidade: Cidade

    @Column()
    nome: string

    @Column()
    cep: string

    @Column()
    endereco: string

    @Column()
    numero: number

    @Column()
    complemento: string

    @Column()
    telefone: string

    @Column()
    email: string
}