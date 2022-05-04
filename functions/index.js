const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/api", require("./routes.js"));
app.get("*", (req, res) => {
  res.status(404).send({ error: "could not find resource" });
});

exports.fns = functions.https.onRequest(app);
