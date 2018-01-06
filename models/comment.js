const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const commentSchema = mongoose.Schema({
  text: String,
  author: String
});

module.exports = mongoose.model("Comment", commentSchema);
