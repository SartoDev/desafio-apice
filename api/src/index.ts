import { AppDataSource } from "./data-source"
import { Pessoa } from "./entity/Pessoa"

AppDataSource.initialize().then(async () => {
    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}).catch(error => console.log(error))
