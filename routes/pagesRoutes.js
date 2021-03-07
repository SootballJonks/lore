//This is pages routes. It will do all the GET and POST methods to direct and redirect

//we can use cookie session here to decide if the user is loged in or not

const express = require("express");
const router = express.Router();

//when user is visiting the main page. It will render the stories.ejs
router.get("/", (req, res) => {
  res.render("stories");
});

module.exports = router;
