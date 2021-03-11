const express = require("express");
const router = express.Router();

const {
  addNewPiece,
  getAllPieces,
  addPieceToStory,
  getID,
  deletePiece,
} = require("../lib/queries");

//SUBMIT A PIECE TO STORY AS PENDING
router.post("/", (req, res) => {
  const username = req.session.username;

  console.log("This is the body for piece: ", req.body);
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

  addPieceToStory(req.body)
    .then(() => {
      console.log("Story appended!");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//DELETE A PIECE
router.post("/:storyID/delete", (req, res) => {

  deletePiece(req.body)
    .then(() => {
      console.log("Piece Deleted!");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });

});


module.exports = router;
