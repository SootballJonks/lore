//This is pages routes. It will do all the GET and POST methods to direct and redirect

//we can use cookie session here to decide if the user is loged in or not

const express = require("express");
const router = express.Router();

router.get("/stories", (req, res) => {
  // if (!req.session.userid) return res.redirect("/");
  console.log(req);
  let templateVars = res;
  res.redirect("/stories", templateVars);
});

module.exports = router;
