import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Cidade extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({name: "sigla_uf"})
    siglaUF: string
}