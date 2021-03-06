const express = require("express");
const router = express.Router();

router.get("/stories", (req, res) => {
  // if (!req.session.userid) return res.redirect("/");
  console.log(req);
  let templateVars = 0;
  res.render("stories", templateVars);
});

module.exports = router;
