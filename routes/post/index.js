const router = require("express").Router();
const clientPromise = require("../../db/conexao");

const { hashPassword } = require("../../lib/auth");

router.post("/", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("GBUSINESS");
    await db
      .collection("usuarios")
      .update({ telefone: req.body.telefone }, { $push: { posts: req.body } });

    res.status(200).json("true");
  } catch (err) {
    res.status(500).json(false);
  }
});

module.exports = router;
