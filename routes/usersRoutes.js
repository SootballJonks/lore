/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log(req.body);

    const queryString = `
      SELECT *
      FROM stories
      WHERE user_id = $1;
    `;
    const values = [req.body.user_id];

    return db.query(queryString, values)
      .then(data => {
        const userStories = data.rows;
        res.json({ userStories });
      })
      .catch(err => {
        console.error('query error:', err.stack)
      });
  });

  // router.get("/:userNAME", (req, res) => {
  //   res.send('test');
  // });

  return router;
};
