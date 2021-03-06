// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8081;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const db = require("./db/db.js");

// PG database client/connection setup
// console.log('connected', db);
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/usersRoutes.js");
const storiesRoutes = require("./routes/storiesRoutes.js");
const piecesRoutes = require("./routes/piecesRoutes.js");
const loginRoutes = require("./routes/loginRoutes.js");
const upvotesRoutes = require("./routes/upvotesRoutes.js");
const pages = require("./routes/pagesRoutes.js");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

//The refactored rounte should not be taking database as an argument anymore since it's passed with the query
//if you still have error please remove the parentheses like "storiesRoutes"

app.use("/users", usersRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/pieces", piecesRoutes);
app.use("/login", loginRoutes);
app.use("/api/upvotes", upvotesRoutes);

app.use("/", pages);
// Note: mount other resources here, using the same pattern above

app.use(express.static("public"));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
