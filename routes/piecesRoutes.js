const express = require("express");
const router = express.Router();

const {
  addNewPiece,
  getAllPieces,
  addPieceToStory,
  getID,
} = require("../lib/queries");

//SUBMIT A PIECE TO STORY AS PENDING
router.post("/", (req, res) => {
  const username = req.session.username;
  getID(username)
    .then((id) => {
      return addNewPiece(id, req.body);
    })
    .then((piece) => {
      res.json(piece);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//GET PIECES FOR SPECIFIC STORY
router.get("/:storyID", (req, res) => {
  getAllPieces(req.params.storyID)
    .then((pieces) => {
      res.json(pieces);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//APPROVE PENDING PIECE AND MERGE INTO STORY

// http://localhost:8080/api/pieces/:storyID

router.post("/:storyID", (req, res) => {
 console.log(req.body);
  addPieceToStory(req.body)
    .then((appendedStory) => {
      console.log("appended story?: ", appendedStory);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
module.exports = router;
