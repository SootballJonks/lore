/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const { getUserStories, newStory, getID } = require("../lib/queries");

//HELPER FUNCTION (this needs to be moved):

//-------------

//GET USER-SPECIFIC STORIES
router.get("/:userNAME", (req, res) => {
  const username = req.session.username;
  getUserStories(username)
    .then((stories) => {
      res.json(stories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//POST NEW STORY (change route and move elsewhere)
router.post("/:userNAME", (req, res) => {
  const username = req.session.username;
  getID(username)
    .then((id) => {
      newStory(id, req.body);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//GET SESSION USERNAME

router.get("/", (req, res) => {
  const username = req.session.username;
  res.send(username);
});

module.exports = router;
