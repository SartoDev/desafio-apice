import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Cidade {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    siglaUF: string
}