const router = require("express").Router();
const clientPromise = require("../../db/conexao");

const { hashPassword } = require("../../lib/auth");

router.post("/", async (req, res) => {
  try {
    const cliente = await clientPromise;

    const db = cliente.db("GBUSINESS");
    const Userdata = await db
      .collection("usuarios")
      .findOne({ telefone: req.body.telefone });

    if (Userdata) {
      res.status(200).json("false");
    } else {
      const senha = await hashPassword(req.body.senha);
      var data = req.body;
      data.senha = senha;

      const cliente = await clientPromise;
      await db.collection("usuarios").insertOne(data);

      res.status(200).json("true");
    }
  } catch (err) {
    res.status(500).json(false);
  }
});

module.exports = router;
