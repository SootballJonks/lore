const express = require("express");
const router = express.Router();

const { addUpvote, getAllUpvotes, getID } = require("../lib/queries");

//GET UPVOTE COUNT
router.get("/", (req, res) => {
  // const pieceID = req.params;

  getAllUpvotes()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//ADD UPVOTE
router.post("/", (req, res) => {
  const username = req.session.username;
  const pieceID = req.body.pieceID;

  getID(username).then((data) => {
    addUpvote(data, pieceID);
    getAllUpvotes()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log("Already upvoted!");
      });
  });
});

module.exports = router;
