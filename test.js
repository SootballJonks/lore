const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  port: 5432,
  password: "labber",
  host: "localhost",
  database: "midterm",
});

pool
  .connect()
  .then((client) => {
    return client.query("SELECT * FROM users").then((res) => console.log(res));
  })
  .catch((err) => {
    console.log(err);
  });
