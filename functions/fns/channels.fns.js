const functions = require("firebase-functions");

const { request } = require("../api.js");

// channels
exports.getChannelDetails = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let id = req.query.id;
  if (!id) {
    id = req.body.id;
  }
  let parts = req.query.parts;
  if (!parts) {
    parts = req.body.parts;
  }

  request("/channels", {
    params: {
      part: parts || "snippet,statistics,contentDetails",
      id,
    },
  }).then(
    ({ data }) => {
      functions.logger.log("Sending data fetched from API:", data);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    },
    (error) => {
      functions.logger.log("Error frm subscribed channel req:", error);
      res.set("Access-Control-Allow-Origin", "*");
      res
        .status((error.response && error.response.status) || 400)
        .send(
          (error.response && error.response.data.message) ||
            "Oops!...Error occured"
        );
    }
  );
};

exports.checkSubscriptionStatus = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let accessToken = req.query.accessToken;
  if (!accessToken) {
    accessToken = req.body.accessToken;
  }
  let id = req.query.id;
  if (!id) {
    id = req.body.id;
  }

  request("/subscriptions", {
    params: {
      part: "snippet",
      forChannelId: id,
      mine: true,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  }).then(
    ({ data }) => {
      functions.logger.log("Sending data fetched from API:", data);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    },
    (error) => {
      functions.logger.log("Error frm subscribed channel req:", error);
      res.set("Access-Control-Allow-Origin", "*");
      res
        .status((error.response && error.response.status) || 400)
        .send(
          (error.response && error.response.data.message) ||
            "Oops!...Error occured"
        );
    }
  );
};

exports.getOneChannelDetails = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let { id: channelId } = req.query;
  if (!channelId) {
    channelId = req.body.nextPageToken;
  }

  request("/channels", {
    params: {
      part: "snippet",
      id: channelId,
    },
  }).then(
    ({ data }) => {
      // functions.logger.log("Sending data fetched from API:", data);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    },
    (error) => {
      functions.logger.log("Error frm request API:", error);
      res.set("Access-Control-Allow-Origin", "*");
      res
        .status((error.response && error.response.status) || 400)
        .send(
          (error.response && error.response.data.message) ||
            "Oops!...Error occured"
        );
    }
  );
};
