require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

console.log("PORT chargé :", port);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
