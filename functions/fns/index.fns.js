const fns = {};

Object.assign(
  fns,
  require("./channels.fns.js"),
  require("./comments.fns.js"),
  require("./videos.fns.js")
);

module.exports = fns;
