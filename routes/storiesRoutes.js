/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM stories;`;
    console.log(query);
    db.query(query)
<<<<<<< HEAD:routes/storiesRoutes.js
      .then((data) => {
        const stories = data.rows[0];
=======
      .then(data => {
        const stories = data.rows;
>>>>>>> b5fa5778dc55e64bb85ef345f1110cb7c28b74fd:routes/stories.js
        res.json({ stories });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
