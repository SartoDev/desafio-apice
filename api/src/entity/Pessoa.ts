import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne, PrimaryColumn, BaseEntity } from "typeorm"
import { Cidade } from "./Cidade"
import { Bairro } from "./Bairro"

@Entity()
export class Pessoa extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => Bairro, {nullable: false})
    @JoinColumn({name: "bairro_id"})
    bairro: Bairro

    @ManyToOne(() => Cidade, {nullable: false})
    @JoinColumn({name: "cidade_id"})
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