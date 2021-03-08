const express = require("express");
const router = express.Router();

const { checkEmail } = require("../lib/queries");

//Currently set to render a login page?
router.get("/", (req, res) => {
  res.render("login");
});

//Post route to log in with email (does not check password)
router.post("/", (req, res) => {
  const email = req.body.email;
  //const password = req.body.password;
  checkEmail(email).then((user) => {
    if (!user.username) {
      res.status(403).send(`User does not exist!`);
    }
    if (user.username) {
      req.session.username = user.username;
      res.redirect("/");
    }
  });
});

module.exports = router;
