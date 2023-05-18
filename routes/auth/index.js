const router = require("express").Router();
const clientPromise = require("../../db/conexao");
const { verifyPassword } = require("../../lib/auth");

router.post("/", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("GBUSINESS");

    const data = await db
      .collection("usuarios")
      .findOne({ telefone: req.body.telefone });

    if (data) {
      const isValid = await verifyPassword(req.body.senha, data.senha);
      if (!isValid) {
        res.json("false");
      } else {
        res.status(200).json(data);
      }
    }

    if (!data) {
      res.json("false");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
