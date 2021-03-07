const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render('login');
    

//   router.get("/api/users/", (req, res) => {
//     db.query(`SELECT * FROM users`)
//       .then((data) => {
//         const users = data.rows;
//         res.send({ users });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
  });


  return router;
};
