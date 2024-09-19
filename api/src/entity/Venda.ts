import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne, CreateDateColumn, ManyToMany, JoinTable, BaseEntity } from "typeorm"
import { Pessoa } from "./Pessoa"

@Entity()
export class Venda extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ name: "data_venda" })
    dataVenda: string
    
    @ManyToOne(() => Pessoa, {nullable: false})
    @JoinColumn({name: "pessoa_id"})
    pessoa: Pessoa

    @Column({ type: "numeric", precision: 10, scale: 2 })
    valor: number
}