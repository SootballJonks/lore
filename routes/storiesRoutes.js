/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getUserStories } = require("../lib/queries");
console.log(getUserStories());
module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM stories;`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const stories = data.rows[0];
        res.json({ stories });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
