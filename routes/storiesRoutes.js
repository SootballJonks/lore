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
    const queryParams = [];

  let queryString = `
    SELECT *
    FROM stories
    WHERE true
  `;

  //specific user
  if(req.user_id) {
    queryParams.push(`%${req.user_id}%`);
    queryString += `AND user_id LIKE $${queryParams.length} `;
  }
  //specific title
  if(req.title) {
    queryParams.push(`%${req.title}%`);
    queryString += `AND title LIKE $${queryParams.length} `;
  }
  //specific tags
  if(req.tags) {
    queryParams.push(`%${req.tags}%`);
    queryString += `AND tags ANY($${queryParams.length}) `;
  }
  //active status
  if(req.active) {
    queryParams.push(`%${req.active}%`);
    queryString += `AND active = $${queryParams.length} `;
  }

  queryString += `;`;

  return db.query(queryString, queryParams)
    .then(data => {
      const allStories = data.rows;
      res.json({ allStories });
    })
    .catch(err => {
      console.error('query error:', err.stack)
    });
  });

  return router;
};
