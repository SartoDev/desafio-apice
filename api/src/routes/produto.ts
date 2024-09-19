import { Produto } from "../entity/Produto"

var bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
var jsonParser = bodyParser.json()

router.get("/", async (req, res) => {
    const produtoList = await Produto.find()
    res.send(produtoList)
})

router.get("/:id", async (req, res) => {
    const produtoFind = await Produto.findOneBy({id: req.params.id})
    if(!produtoFind) {
        res.sendStatus(404)
    } else {
        res.send(produtoFind)
    }
})

router.post("/", jsonParser, async (req, res) => {
    if(typeof req.body.valor !== "number") {
        res.status(500).send("Informe um valor válido para o produto")
        return
    }
    const produto = new Produto()
    produto.nome = req.body.nome
    produto.valor = req.body.valor
    const bairroSaved = await produto.save()
    res.send(bairroSaved)
})

router.put("/:id", jsonParser, async (req, res) => {
    if(typeof req.body.valor !== "number") {
        res.status(500).send("Informe um valor válido para o produto")
        return
    }
    try {
        const produtoFind = await Produto.findOneBy({id: req.params.id})
        produtoFind.nome = req.body.nome
        produtoFind.valor = req.body.valor
        produtoFind.save()
        res.send(produtoFind)
    } catch(e) {
        res.sendStatus(404)
    }
})

router.delete("/:id", jsonParser, async (req, res) => {
    try {
        const produtoFind = await Produto.findOneBy({id: req.params.id})
        produtoFind.remove()
        res.send(produtoFind)
    } catch(e) {
        res.sendStatus(404)
    }
})

module.exports = router