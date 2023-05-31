const router = require("express").Router();
const clientPromise = require("../../../db/conexao");

const { hashPassword } = require("../../../lib/auth");

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
      .collection("posts")
      .aggregate([
        {telefone:req.body.telefone}, // Unwind the "posts" array
            { $sort: { "date": -1 } }, // Sort posts by date in descending order
            { $limit: 5 } // Limit the number of posts to 5
           
          ])
      );

    res.status(200).json(user.posts);
  } catch (err) {
    res.status(500).json(false);
  }
});

router.post("/alls", async (req, res) => {

    try {
        const cliente = await clientPromise;
        const db = cliente.db("GBUSINESS");
    
        const allPosts = await db
          .collection("posts")
          .aggregate([ // Unwind the "posts" array
            { $sort: { "date": -1 } }, // Sort posts by date in descending order
            { $limit: 5 } // Limit the number of posts to 5
          ])
          .toArray();
    
        res.status(200).json(allPosts);
      } catch (err) {
        res.status(500).json(false);
      }
  
  });
module.exports = router;
