import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    const express = require('express')
    const app = express()
    const port = 3001
    var cors = require('cors')
    app.use(cors())
    
    const bairroRouter = require("./routes/bairro")
    const cidadeRouter = require("./routes/cidade")
    const produtoRouter = require("./routes/produto")
    const vendaRouter = require("./routes/venda")
    const vendaItensRouter = require("./routes/vendaItens")
    const pessoaRouter = require("./routes/pessoa")

    app.use("/bairros", bairroRouter)
    app.use("/cidades", cidadeRouter)
    app.use("/produtos", produtoRouter)
    app.use("/vendas", vendaRouter)
    app.use("/venda-itens", vendaItensRouter)
    app.use("/pessoas", pessoaRouter)

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}).catch(error => console.log(error))
