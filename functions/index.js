const functions = require("firebase-functions");
const express = require("express");


const app = express();
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes.js"));
app._router.stack.forEach(function(r) {
  if (r.route && r.route.path) {
    console.log(`--------- ${r.route.path} --------`);
  }
});
app.get("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.status(404).send({ error: "could not find route" });
});

exports.fns = functions.https.onRequest(app);
