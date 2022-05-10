const functions = require("firebase-functions");

const { request } = require("../api.js");
const { requestApi } = require("../apiPreflight.js");

//  videos
exports.getPopularVideos = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let pgToken = req.query.nextPageToken;
  let region = req.query.region;
  if (!pgToken) {
    pgToken = req.body.nextPageToken;
  }
  if (!region) {
    region = req.body.region || "KE";
  }
  let parts = req.query.parts;
  if (!parts) {
    parts = req.body.parts;
  }

  // console.log("-------------------------------------------------");
  // console.log("REGION:::: ", region);
  // console.log("-------------------------------------------------");

  request("/videos", {
    params: {
      part: parts || "snippet,contentDetails,statistics",
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
};

exports.getVideosByCategory = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let pgToken = req.query.nextPageToken;
  let keyword = req.query.keyword;
  let totalResults = req.query.totalResults;
  if (!pgToken) {
    pgToken = req.body.nextPageToken;
  }
  if (!keyword) {
    keyword = req.body.keyword;
  }
  if (!totalResults) {
    totalResults = req.body.totalResults;
  }

  request("/search", {
    params: {
      part: "snippet",
      maxResults: totalResults || 20,
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
};

exports.getVideoById = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let id = req.query.id;
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
};

exports.getRelatedVideos = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let id = req.query.id;
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
};

exports.getVideosBySearch = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let keyword = req.query.keyword;
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
};

exports.getSubscribedChannels = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let accessToken = req.query.accessToken;
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
      functions.logger.log(
        "Error frm subscribed channel req:",
        error.response.data
      );
      res.set("Access-Control-Allow-Origin", "*");
      res
        .status((error.response && error.response.status) || 400)
        .send(
          (error.response && error.response.data.error.message) ||
            "Oops!...Error occured"
        );
    }
  );
};

exports.getPlaylistByChannelId = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let id = req.query.id;
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
};

exports.getOneVideoDetails = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let id = req.query.id;
  if (!id) {
    id = req.body.id;
  }
  request("/videos", {
    params: {
      part: "contentDetails,statistics",
      id,
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
          (error.response && error.response.error.message) ||
            "Oops!...Error occured"
        );
    }
  );
};

exports.getMyLikedVideos = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let pageToken = req.query.pageToken;
  if (!pageToken) {
    pageToken = req.body.pageToken;
  }
  let accessToken = req.query.accessToken;
  if (!accessToken) {
    accessToken = req.body.accessToken;
  }
  request("/videos", {
    params: {
      part: "snippet,contentDetails,statistics",
      myRating: "like",
      maxResults: 15,
      pageToken,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
          (error.response && error.response.data.error.message) ||
            "Oops!...Error occured"
        );
    }
  );
};

exports.likeVideo = (req, res) => {
  if (req.method !== "POST") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  console.log("_____REQUEST BODY______", req.body);
  const body = req.body;

  // YouTube video ID & accessToken & rating
  const { accessToken, id, rating } = body;
  console.log(body.rating);

  requestApi
    .post("/videos/rate", {
      params: {
        id,
        rating,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(
      (res) => {
        // functions.logger.log("Sending data fetched from API:", data);
        res.status(res.status).send(res.data);
      },
      (error) => {
        functions.logger.log(
          "Error frm request API:",
          error.response.data?.error
        );
        res
          .status((error.response && error.response.status) || 400)
          .send(
            (error.response && error.response.data.error.message) ||
              "Oops!...Error occured"
          );
      }
    );
};

exports.getOneVideoRating = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let id = req.query.id;
  if (!id) {
    id = req.body.id;
  }
  let accessToken = req.query.accessToken;
  if (!accessToken) {
    accessToken = req.body.accessToken;
  }
  console.log(id);
  console.log(accessToken);
  request("/videos/getRating", {
    params: {
      id,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(
    ({ data }) => {
      // functions.logger.log("Sending data fetched from API:", data);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    },
    (error) => {
      functions.logger.log("Error frm request API:", error?.response);
      res.set("Access-Control-Allow-Origin", "*");
      res
        .status((error.response && error.response.status) || 400)
        .send(
          (error.response && error.response.data?.error?.message) ||
            "Oops!...Error occured"
        );
    }
  );
};
