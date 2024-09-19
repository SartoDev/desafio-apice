import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Venda } from "./Venda"
import { Produto } from "./Produto"

@Entity()
export class VendaItens extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Venda, { nullable: false })
    @JoinColumn({ name: 'venda_id' })
    venda: Venda

    @ManyToOne(() => Produto, {nullable: false})
    @JoinColumn({name: "produto_id"})
    produto: Produto

    @Column()
    quantidade: number
    vendaItens: Promise<Venda>
}