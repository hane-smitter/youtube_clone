const functions = require("firebase-functions");

const { request } = require("../api.js");

// comments
exports.getCommentOfVideoById = (req, res) => {
  if (req.method !== "GET") {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(405);
    return;
  }

  let id = req.query.id;
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
};

exports.addComment = (req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(405);
    return;
  }
  //   const parser = bodyParser.urlencoded({ extended: false });
  //   parser(req, res, () => {
  //     /* let reqObj = Object.keys(req.body).join("");
  //     reqObj = JSON.parse(reqObj); */
  //     const reqObj = req.body;

  //     let { id, text, accessToken } = reqObj;
  //     if (!id) {
  //       id = req.query.id;
  //     }
  //     if (!text) {
  //       text = req.query.text;
  //     }
  //     if (!accessToken) {
  //       accessToken = req.query.accessToken;
  //     }

  //     const bodyFormat = {
  //       snippet: {
  //         videoId: id,
  //         topLevelComment: {
  //           snippet: {
  //             textOriginal: text,
  //           },
  //         },
  //       },
  //     };
  //     request
  //       .post("/commentThreads", bodyFormat, {
  //         params: {
  //           part: "snippet",
  //         },
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       })
  //       .then(
  //         ({ data }) => {
  //           functions.logger.log("posted(create) data to API:", data);
  //           res.set("Access-Control-Allow-Origin", "*");
  //           res.status(200).send(data);
  //         },
  //         (error) => {
  //           functions.logger.log(
  //             "Error frm subscribed channel req:",
  //             error.response.data.error
  //           );
  //           res.set("Access-Control-Allow-Origin", "*");
  //           res
  //             .status((error.response && error.response.status) || 400)
  //             .send(error.response.data.error);
  //         }
  //       );
  //   });

  let { id, text, accessToken } = req.query;
  if (!id) {
    id = req.query.id;
  }
  if (!text) {
    text = req.query.text;
  }
  if (!accessToken) {
    accessToken = req.query.accessToken;
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
    .post("/commentThreads", bodyFormat, {
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
        functions.logger.log(
          "Error frm subscribed channel req:",
          error.response.data.error
        );
        res.set("Access-Control-Allow-Origin", "*");
        res
          .status((error.response && error.response.status) || 400)
          .send(error.response.data.error);
      }
    );
};
