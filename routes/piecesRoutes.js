const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //GET PIECES FOR SPECIFIC STORY
  router.get("/", (req, res) => {
    const queryString = `
      SELECT *
      FROM pieces
      WHERE story_id = $1;
    `;
    const values = [req.body.story_id];

    return db.query(queryString, values)
      .then(data => {
        const allPieces = data.rows;
        res.json({ allPieces });
      })
      .catch(err => {
        console.error('query error:', err.stack)
      });
  });

  //SUBMIT A PIECE TO STORY AS PENDING
  router.post("/", (req, res) => {
    const queryString = `
    INSERT INTO pieces
    (user_id, story_id, text)
    VALUES
    ($1, $2, $3)
    RETURNING *;
  `;
  const values = [
    req.body.user_id,
    req.body.story_id,
    req.body.text
  ];

  return db.query(queryString, values)
    .then(data => {
      const newPiece = data.rows[0];
      res.json({ newPiece });
    })
    .catch(err => {
      console.error('query error:', err.stack)
    });
  })


  return router;
};
