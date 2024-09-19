import { Cidade } from "../entity/Cidade"

var bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
var jsonParser = bodyParser.json()

router.get("/", async (req, res) => {
    const cidadeList = await Cidade.find()
    res.send(cidadeList)
})

router.get("/:id", async (req, res) => {
    const cidadeFind = await Cidade.findOneBy({id: req.params.id})
    if(!cidadeFind) {
        res.sendStatus(404)
    } else {
        res.send(cidadeFind)
    }
})

router.post("/", jsonParser, async (req, res) => {
    const cidade = new Cidade()
    cidade.nome = req.body.nome
    cidade.siglaUF = req.body.siglaUF
    const bairroSaved = await cidade.save()
    res.send(bairroSaved)
})

router.put("/:id", jsonParser, async (req, res) => {
    try {
        const cidadeFind = await Cidade.findOneBy({id: req.params.id})
        cidadeFind.nome = req.body.nome
        cidadeFind.siglaUF = req.body.siglaUF
        cidadeFind.save()
        res.send(cidadeFind)
    } catch(e) {
        res.sendStatus(404)
    }
})

router.delete("/:id", jsonParser, async (req, res) => {
    try {
        const cidadeFind = await Cidade.findOneBy({id: req.params.id})
        await cidadeFind.remove()
        res.send(cidadeFind)
    } catch(e) {
        res.sendStatus(500)
    }
})

module.exports = router