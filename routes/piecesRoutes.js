const express = require("express");
const router = express.Router();

const { addNewPiece } = require("../lib/queries");

//SUBMIT A PIECE TO STORY AS PENDING
router.post("/", (req, res) => {
  addNewPiece(req.body)
    .then((piece) => {
      res.json(piece);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
})

module.exports = router;
