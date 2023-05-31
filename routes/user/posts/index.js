const router = require("express").Router();
const clientPromise = require("../../db/conexao");

const { hashPassword } = require("../../lib/auth");

router.post("/", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("GBUSINESS");
    await db
      .collection("usuarios")
      .updateOne({ telefone: req.body.telefone }, { $set: req.body });

    res.status(200).json("true");
  } catch (err) {
    res.status(500).json(false);
  }
});

router.post("/all", async (req, res) => {
  try {
    const cliente = await clientPromise;
    const db = cliente.db("GBUSINESS");
   const user = await db
      .collection("usuarios")
      .findOne(
        { telefone: req.body.telefone }
      );

    res.status(200).json(user.posts);
  } catch (err) {
    res.status(500).json(false);
  }
});

module.exports = router;
