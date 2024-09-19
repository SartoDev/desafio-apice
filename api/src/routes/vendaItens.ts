import { Venda } from "../entity/Venda"
import { Produto } from "../entity/Produto"
import { VendaItens } from "../entity/VendaItens"

var bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
var jsonParser = bodyParser.json()

router.get("/", async (req, res, next) => {
    if(req.query.vendaId) {
        next()
        return
    }
    const vendaItensList = await VendaItens.find()
    res.send(vendaItensList)
}, async (req, res) => {
    const vendaFind = await Venda.findOneBy({id: req.query.vendaId})
    if(!vendaFind) {
        res.sendStatus(404)
    }
    const vendaItensFind = await VendaItens.createQueryBuilder("vendaItens")
    .leftJoinAndSelect("vendaItens.produto", "cidade")
    .where("vendaItens.venda.id = :id", {id: vendaFind.id})
    .getMany()
    if(vendaItensFind.length <= 0) {
        res.sendStatus(404)
    } else {
        res.send(vendaItensFind)
    }
})

router.get("/:id", async (req, res) => {
    const vendaItensFind = await VendaItens.findOneBy({id: req.params.id})
    if(!vendaItensFind) {
        res.sendStatus(404)
    } else {
        res.send(vendaItensFind)
    }
})

router.post("/", jsonParser, async (req, res) => {
    if(typeof req.body.quantidade !== "number") {
        res.status(500).send("Informe um valor válido para a quantidade")
        return
    }
    try {
        const vendaItens = new VendaItens()
        vendaItens.quantidade = req.body.quantidade
        const venda = await Venda.findOneBy({id: req.body.venda.id})
        vendaItens.venda = venda
        const produto = await Produto.findOneBy({id: req.body.produto.id})
        vendaItens.produto = produto
        const vendaSaved = await vendaItens.save()
        res.send(vendaSaved)
    } catch(e) {
        res.status(404).send(e.sqlMessage)
    }
})

router.put("/:id", jsonParser, async (req, res) => {
    if(typeof req.body.quantidade !== "number") {
        res.status(500).send("Informe um valor válido para a quantidade")
        return
    }
    try {
        const vendaItensFind = await VendaItens.findOneBy({id: req.params.id})
        vendaItensFind.quantidade = req.body.quantidade
        const venda = await Venda.findOneBy({id: req.body.venda.id})
        vendaItensFind.venda = venda
        const produto = await Produto.findOneBy({id: req.body.produto.id})
        vendaItensFind.produto = produto
        await vendaItensFind.save()
        res.send(vendaItensFind)
    } catch(e) {
        res.status(404).send(e.sqlMessage)
    }
})

router.delete("/:id", jsonParser, async (req, res) => {
    try {
        const vendaItensFind = await VendaItens.findOneBy({id: req.params.id})
        vendaItensFind.remove()
        res.send(vendaItensFind)
    } catch(e) {
        res.sendStatus(404)
    }
})

module.exports = router