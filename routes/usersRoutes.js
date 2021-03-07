/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const { getUserStories, newStory } = require("../lib/queries");

//HELPER FUNCTION (this needs to be moved):


//-------------

//GET USER-SPECIFIC STORIES
router.get("/:userNAME", (req, res) => {
  const username = req.params.userNAME;
  getUserStories(username)
    .then((stories) => {
      res.json(stories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//POST NEW STORY
router.post("/:userNAME", (req, res) => {
  newStory(req.body)
    .then((newStory) => {
      res.json(newStory);
      //We should make this redirect to the edit-story page...
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
})

module.exports = router;
