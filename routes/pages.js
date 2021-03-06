const express = require("express");
const router = express.Router();

router.get("/stories", (req, res) => {
  // if (!req.session.userid) return res.redirect("/");

  let templateVars = 0;
  res.render("stories", templateVars);
});

module.exports = router;
