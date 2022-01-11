const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

/* 
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) */

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes.js"));
app.get("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.status(404).send({ error: "could not find route" });
});

exports.fns = functions.https.onRequest(app);
