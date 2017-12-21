var mongoose = require("mongoose");

var kellapridaSchema = new mongoose.Schema({
  doc: String,
  ridapr: String,
  ridapab: String,
  kuraspr: String,
  kuraspab: String,
  pakelimai: String,
  siurblys: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Kellaprida", kellapridaSchema, "kellap");
