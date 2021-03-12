//This is pages routes. It will do all the GET and POST methods to direct and redirect

const express = require("express");
const router = express.Router();

//If logged in, it will render the homepage. If not, redirects to login. Only users can access the website.
router.get("/", (req, res) => {
  const username = req.session.username;
  console.log(username);
  if (!username) {
    res.redirect("/login");
  }
  if (username) {
    res.render("index", { username });
    //index is our homepage. stories.ejs is now obsolete
  }
});

module.exports = router;
