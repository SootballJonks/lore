/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const {
  getUserStories,
  newStory,
  getID,
  isUserTheOwner,
  storyComplete,
} = require("../lib/queries");

//HELPER FUNCTION (this needs to be moved):

//-------------
router.post("/complete", (req, res) => {
  let storyID = req.body;
  storyComplete(storyID).then((response) => {
    res.send(response);
  });
});

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
      res.send(newStory(id, req.body));
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//GET TRUE/FALSE IF USER IS OWNER OF STORY
router.post("/", (req, res) => {
  const username = req.session.username;
  const storyID = req.body;

  isUserTheOwner(username, storyID).then((data) => {
    res.send(data);
  });
});

module.exports = router;
