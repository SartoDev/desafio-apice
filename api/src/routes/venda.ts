import { Pessoa } from "../entity/Pessoa"
import { Produto } from "../entity/Produto"
import { Venda } from "../entity/Venda"
import { VendaItens } from "../entity/VendaItens"

var bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
var jsonParser = bodyParser.json()

router.get("/", async (req, res) => {
    const vendaList = await Venda.createQueryBuilder("venda")
    .leftJoinAndSelect("venda.pessoa", "pessoa")
    .getMany()
    res.send(vendaList)
})

router.get("/:id", async (req, res) => {
    const vendaFind = await Venda.createQueryBuilder("venda")
    .leftJoinAndSelect("venda.pessoa", "pessoa")
    .where("venda.id = :id", {id: req.params.id})
    .getOne()
    if(!vendaFind) {
        res.sendStatus(404)
    } else {
        res.send(vendaFind)
    }
})

router.post("/", jsonParser, async (req, res) => {
    if(typeof req.body.valor !== "number") {
        res.status(500).send("Informe um valor válido para a venda")
        return
    }
    try {
        const venda = new Venda()
        venda.valor = req.body.valor
        const pessoa = await Pessoa.findOneBy({id: req.body.pessoa.id})
        venda.pessoa = pessoa
        const vendaSaved = await venda.save()
        req.body.vendaItemList.forEach(async element => {
            const vendaItens = new VendaItens()
            vendaItens.quantidade = element.quantidade
            vendaItens.venda = vendaSaved
            const produto = await Produto.findOneBy({id: element.id})
            vendaItens.produto = produto
            const vendaItensSaved = await vendaItens.save()
        });
        res.send(vendaSaved)
    } catch(e) {
        res.status(500).send(e.sqlMessage)
    }
})

router.put("/:id", jsonParser, async (req, res) => {
    if(typeof req.body.valor !== "number") {
        res.status(500).send("Informe um valor válido para a venda")
        return
    }
    try {
        const vendaFind = await Venda.findOneBy({id: req.params.id})
        vendaFind.valor = req.body.valor
        vendaFind.dataVenda = req.body.dataVenda
        const pessoa = await Pessoa.findOneBy({id: req.body.pessoa.id})
        vendaFind.pessoa = pessoa
        const vendaSaved = await vendaFind.save()
        req.body.vendaItemList.forEach(async element => {
            element.venda = vendaSaved
            const produto = await Produto.findOneBy({id: element.id})
            element.produto = produto
            const vendaItensSaved = await element.save()
        });
        res.send(vendaFind)
    } catch(e) {
        res.status(404).send(e.sqlMessage)
    }
})

router.delete("/:id", jsonParser, async (req, res) => {
    try {
        const vendaFind = await Venda.findOneBy({id: req.params.id})
        vendaFind.remove()
        res.send(vendaFind)
    } catch(e) {
        res.sendStatus(404)
    }
})

module.exports = router