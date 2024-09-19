import { Cidade } from "../entity/Cidade";
import { Bairro } from "../entity/Bairro";
import { Pessoa } from "../entity/Pessoa";

var bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
var jsonParser = bodyParser.json();

router.get(
  "/",
  async (req, res, next) => {
    if (req.query.nome || req.query.cidade || req.query.bairro) {
      next();
      return;
    }
    const pessoaList = await Pessoa.createQueryBuilder("pessoa")
      .leftJoinAndSelect("pessoa.cidade", "cidade")
      .leftJoinAndSelect("pessoa.bairro", "bairro")
      .getMany();
    res.send(pessoaList);
  },
  async (req, res) => {
    const pessoaFind = await Pessoa.createQueryBuilder("pessoa")
      .leftJoinAndSelect("pessoa.cidade", "cidade")
      .leftJoinAndSelect("pessoa.bairro", "bairro")
      .where(
        "pessoa.nome like :nome",
        { nome: `%${req.query.nome}%` }
      )
      .andWhere("cidade.nome like :cidade",
        { cidade: `${req.query.cidade}%` })
      .andWhere("bairro.nome like :bairro",
        { bairro: `${req.query.bairro}%` })
      .getMany();
    if (!pessoaFind) {
      res.sendStatus(404);
    } else {
      res.send(pessoaFind);
    }
  }
);

router.get("/:id", async (req, res) => {
  const pessoaFind = await Pessoa.createQueryBuilder("pessoa")
    .leftJoinAndSelect("pessoa.cidade", "cidade")
    .leftJoinAndSelect("pessoa.bairro", "bairro")
    .where("pessoa.id = :id", { id: req.params.id })
    .getOne();
  if (!pessoaFind) {
    res.sendStatus(404);
  } else {
    res.send(pessoaFind);
  }
});

router.post("/", jsonParser, async (req, res) => {
  if (typeof req.body.numero !== "number") {
    res.status(500).send("Informe um valor válido para o número da residência");
    return;
  }
  try {
    const pessoa = new Pessoa();
    pessoa.nome = req.body.nome;
    pessoa.cep = req.body.cep;
    pessoa.endereco = req.body.endereco;
    pessoa.numero = req.body.numero;
    pessoa.complemento = req.body.complemento;
    pessoa.telefone = req.body.telefone;
    pessoa.email = req.body.email;
    const bairro = await Bairro.findOneBy({ id: req.body.bairro.id });
    pessoa.bairro = bairro;
    const cidade = await Cidade.findOneBy({ id: req.body.cidade.id });
    pessoa.cidade = cidade;
    const pessoaSaved = await pessoa.save();
    res.send(pessoaSaved);
  } catch (e) {
    res.status(404).send(e.sqlMessage);
  }
});

router.put("/:id", jsonParser, async (req, res) => {
  if (typeof req.body.numero !== "number") {
    res.status(500).send("Informe um valor válido para o número da residência");
    return;
  }
  try {
    const pessoaFind = await Pessoa.findOneBy({ id: req.params.id });
    pessoaFind.nome = req.body.nome;
    pessoaFind.cep = req.body.cep;
    pessoaFind.endereco = req.body.endereco;
    pessoaFind.numero = req.body.numero;
    pessoaFind.complemento = req.body.complemento;
    pessoaFind.telefone = req.body.telefone;
    pessoaFind.email = req.body.email;
    const bairro = await Bairro.findOneBy({ id: req.body.bairro.id });
    pessoaFind.bairro = bairro;
    const cidade = await Cidade.findOneBy({ id: req.body.cidade.id });
    pessoaFind.cidade = cidade;
    await pessoaFind.save();
    res.send(pessoaFind);
  } catch (e) {
    res.status(404).send(e.sqlMessage);
  }
});

router.delete("/:id", jsonParser, async (req, res) => {
  try {
    const pessoaFind = await Pessoa.findOneBy({ id: req.params.id });
    await pessoaFind.remove();
    res.send(pessoaFind);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
