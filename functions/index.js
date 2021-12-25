const functions = require("firebase-functions");

const { request } = require("./api.js");

//  videos
exports.getPopularVideos = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(405);
    return;
  }

  let pgToken = req.query.nextPageToken;
  const region = req.query.region || "KE";
  if (!pgToken) {
    pgToken = req.body.nextPageToken;
  }

  request("/videos", {
    params: {
      part: "snippet,contentDetails,statistics",
      chart: "mostPopular",
      regionCode: region,
      maxResults: 20,
      pageToken: pgToken,
    },
  }).then(
    ({ data }) => {
      functions.logger.log("Sending data fetched from API:", data);
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
});

exports.getVideosByCategory = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(405);
    return;
  }

  let pgToken = req.query.nextPageToken;
  let keyword = req.query.keyword;
  if (!pgToken) {
    pgToken = req.body.nextPageToken;
  }
  if (!keyword) {
    keyword = req.body.keyword;
  }

  request("/search", {
    params: {
      part: "snippet",
      maxResults: 20,
      pageToken: pgToken,
      q: keyword,
      type: "video",
    },
  }).then(
    ({ data }) => {
      functions.logger.log("Sending data fetched from API:", data);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    },
    (error) => {
      functions.logger.log("Error frm request videos by cat:", error);
      res.set("Access-Control-Allow-Origin", "*");
      res
        .status((error.response && error.response.status) || 400)
        .send(
          (error.response && error.response.data.message) ||
            "Oops!...Error occured"
        );
    }
  );
});

exports.getVideoById = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(405);
    return;
  }

  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }

  request("/videos", {
    params: { part: "snippet,statistics", id },
  }).then(
    ({ data }) => {
      functions.logger.log("Sending data fetched from API:", data);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    },
    (error) => {
      functions.logger.log("Error frm request videos by cat:", error);
      res.set("Access-Control-Allow-Origin", "*");
      res
        .status((error.response && error.response.status) || 400)
        .send(
          (error.response && error.response.data.message) ||
            "Oops!...Error occured"
        );
    }
  );
});

exports.getRelatedVideos = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(405);
    return;
  }

  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }

  request("/search", {
    params: {
      part: "snippet",
      relatedVideoId: id,
      maxResults: 15,
      type: "video",
    },
  }).then(
    ({ data }) => {
      functions.logger.log("Sending data fetched from API:", data);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    },
    (error) => {
      functions.logger.log("Error frm request related videos:", error);
      res.set("Access-Control-Allow-Origin", "*");
      res
        .status((error.response && error.response.status) || 400)
        .send(
          (error.response && error.response.data.message) ||
            "Oops!...Error occured"
        );
    }
  );
});

exports.getVideosBySearch = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(405);
    return;
  }

  let keyword = req.params.keyword;
  if (!keyword) {
    keyword = req.body.keyword;
  }

  request("/search", {
    params: {
      part: "snippet",
      maxResults: 20,
      q: keyword,
      type: "channel,video",
    },
  }).then(
    ({ data }) => {
      functions.logger.log("Sending data fetched from API:", data);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    },
    (error) => {
      functions.logger.log("Error frm video search:", error);
      res.set("Access-Control-Allow-Origin", "*");
      res
        .status((error.response && error.response.status) || 400)
        .send(
          (error.response && error.response.data.message) ||
            "Oops!...Error occured"
        );
    }
  );
});

exports.getSubscribedChannels = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(405);
    return;
  }

  let accessToken = req.params.accessToken;
  if (!accessToken) {
    accessToken = req.body.accessToken;
  }

  request("/subscriptions", {
    params: {
      part: "snippet,contentDetails",
      mine: true,
      maxResults: 20,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
});

exports.getPlaylistByChannelId = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(405);
    return;
  }

  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }

  //  1. get upload playlist id
  request("/channels", {
    params: {
      part: "contentDetails",
      id,
    },
  })
    .then(({ data: { items } }) => {
      functions.logger.log(
        "did this run: ",
        items[0].contentDetails.relatedPlaylists.uploads
      );
      return items[0].contentDetails.relatedPlaylists.uploads;
    })
    .then((uploadPlaylistId) => {
      functions.logger.log("uploadPlaylist: ", uploadPlaylistId);
      //  2. get the videos using the uploadPlaylistId
      return request("/playlistItems", {
        params: {
          part: "contentDetails,snippet",
          playlistId: uploadPlaylistId,
          maxResults: 40,
        },
      });
    })
    .then(({ data }) => {
      functions.logger.log("Sending data fetched from API:", data);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    })
    .catch((error) => {
      functions.logger.log(
        "Error frm getPlaylistByChannelId:",
        error.response.data.error
      );
      res.set("Access-Control-Allow-Origin", "*");
      res
        .status((error.response && error.response.status) || 400)
        .send(
          (error.response && error.response.data.message) ||
            "Oops!...Error occured"
        );
    });
});

// channels
exports.getChannelDetails = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(405);
    return;
  }

  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }

  request("/channels", {
    params: {
      part: "snippet,statistics,contentDetails",
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
});

exports.checkSubscriptionStatus = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(405);
    return;
  }

  let accessToken = req.params.accessToken;
  if (!accessToken) {
    accessToken = req.body.accessToken;
  }
  let id = req.params.id;
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
});

//comments
exports.getCommentOfVideoById = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(405);
    return;
  }

  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }

  request("/commentThreads", {
    params: {
      part: "snippet",
      videoId: id,
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
});

exports.addComment = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    res.sendStatus(405);
    return;
  }
  let { id, text, accessToken } = req.body;
  if (!id) {
    id = req.params.id;
  }
  if (!text) {
    text = req.params.text;
  }
  if (!accessToken) {
    accessToken = req.params.accessToken;
  }

  const bodyFormat = {
    snippet: {
      videoId: id,
      topLevelComment: {
        snippet: {
          textOriginal: text,
        },
      },
    },
  };
  request
    .post("/commentThreads", body, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(
      ({ data }) => {
        functions.logger.log("posted(create) data to API:", data);
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
});
