import { Bairro } from "../entity/Bairro"
import { Cidade } from "../entity/Cidade"

var bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
var jsonParser = bodyParser.json()

router.get("/", async (req, res, next) => {
    if(req.query.cidadeId) {
        next()
        return
    }
    const bairroList = await Bairro.createQueryBuilder("bairro")
    .leftJoinAndSelect("bairro.cidade", "cidade")
    .getMany()
    res.send(bairroList)
}, async (req, res) => {
    const cidadeFind = await Cidade.findOneBy({id: req.query.cidadeId})
    if(!cidadeFind) {
        res.sendStatus(404)
    }
    const bairroFind = await Bairro.findBy({cidade: cidadeFind})
    if(bairroFind.length <= 0) {
        res.sendStatus(404)
    } else {
        res.send(bairroFind)
    }
})

router.get("/:id", async (req, res) => {
    const bairroFind = await Bairro.findOneBy({id: req.params.id})
    if(!bairroFind) {
        res.sendStatus(404)
    } else {
        res.send(bairroFind)
    }
})

router.post("/", jsonParser, async (req, res) => {
    try {
        const bairro = new Bairro()
        bairro.nome = req.body.nome
        const cidadeFind = await Cidade.findOneBy({id: req.body.cidade.id})
        bairro.cidade = cidadeFind
        const bairroSaved = await bairro.save()
        res.send(bairroSaved)
    } catch (e) {
        res.status(404).send(e.sqlMessage)
    }
})

router.put("/:id", jsonParser, async (req, res) => {
    try {
        const bairroFind = await Bairro.findOneBy({id: req.params.id})
        bairroFind.nome = req.body.nome
        const cidadeFind = await Cidade.findOneBy({id: req.body.cidade.id})
        bairroFind.cidade = cidadeFind
        bairroFind.save()
        res.send(bairroFind)
    } catch(e) {
        res.status(404).send(e.sqlMessage)
    }
})

router.delete("/:id", jsonParser, async (req, res) => {
    try {
        const bairroFind = await Bairro.findOneBy({id: req.params.id})
        await bairroFind.remove()
        res.send(bairroFind)
    } catch(e) {
        res.sendStatus(500)
    }
})

module.exports = router