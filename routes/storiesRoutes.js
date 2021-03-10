/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const {
  getAllStories,
  getAllPieces,
  searchStories,
} = require("../lib/queries");

//GET All STORIES
router.get("/", (req, res) => {
  getAllStories()
    .then((stories) => {
      res.json(stories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//GET PIECES FOR SPECIFIC STORY

router.get("/:userNAME/:storyID", (req, res) => {
  getAllPieces(req.params.storyID)
    .then((pieces) => {
      res.json(pieces);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//POST SEARCH FOR SPECIFIC STORIES (*stretch*)
router.get("/search", (req, res) => {
  searchStories(req.query)
    .then((stories) => {
      res.json(stories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


// "/api/stories/complete"
router.post("/complete")

module.exports = router;
