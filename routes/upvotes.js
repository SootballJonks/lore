const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("api/upvotes", (req, res) => {
    let query = `SELECT * FROM upvotes`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const upvotes = data.rows;
        res.json({ upvotes });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
