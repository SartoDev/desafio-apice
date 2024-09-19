import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, BaseEntity } from "typeorm";
import { Cidade } from "./Cidade";

@Entity()
export class Bairro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Cidade, { nullable: false })
  @JoinColumn({ name: "cidade_id" })
  cidade: Cidade;
}
