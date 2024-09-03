import "reflect-metadata"
import { DataSource } from "typeorm"
import { Pessoa } from "./entity/Pessoa"
import { Bairro } from "./entity/Bairro"
import { Cidade } from "./entity/Cidade"
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
    entities: [Pessoa, Bairro, Cidade, Produto, Venda],
    migrations: [],
    subscribers: [],
})
