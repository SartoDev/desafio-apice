import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Bairro {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string
}