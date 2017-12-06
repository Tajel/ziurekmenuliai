var mongoose = require("mongoose");

var dvSchema = new mongoose.Schema({
  doc: String,
  padkodas: String,
  ipadkodas: String,
  dvkodas: String,
  dvVardasPav: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Dv", dvSchema, "dataSum");
