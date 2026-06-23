import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT;

console.log("PORT chargé :", port);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
