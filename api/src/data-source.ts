import "reflect-metadata"
import { DataSource } from "typeorm"
import { VendaItens } from "./entity/VendaItens"
import { Pessoa } from "./entity/Pessoa"
import { Cidade } from "./entity/Cidade"
import { Bairro } from "./entity/Bairro"
import { Produto } from "./entity/Produto"
import { Venda } from "./entity/Venda"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "1234",
    database: "desafio_apice",
    synchronize: true,
    logging: false,
    entities: [Pessoa, Cidade, Bairro, Produto, Venda, VendaItens],
    migrations: [],
    subscribers: [],
    dropSchema: false
})
