const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //GET UPVOTE COUNT
  router.get("/", (req, res) => {
    const queryString = `
      SELECT count(*)
      FROM upvotes
      WHERE piece_id = $1;
    `;
    const values = [req.body.piece_id];

    return db.query(queryString, values)
      .then(data => {
        const upvoteCount = data.rows;
        res.json({ upvoteCount });
      })
      .catch(err => {
        console.error('query error:', err.stack)
      });
  });

  //ADD UPVOTE
  router.post("/", (req, res) => {
    const queryString = `
    INSERT INTO upvotes
    (user_id, piece_id)
    VALUES
    ($1, $2)
    RETURNING * ;
  `;
  const values = [
    req.body.user_id,
    req.body.piece_id
  ]

  return db.query(queryString, values)
    .then(data => {
      const upvote = data.rows[0]
      res.json({ upvote });
    })
    .catch(err => {
      console.error('query error:', err.stack)
    });
  })

  return router;
};
