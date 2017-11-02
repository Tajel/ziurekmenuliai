var mongoose = require("mongoose");

var kellapvairSchema = new mongoose.Schema({
    doc: String,
    ipilnas: String,
    ivdarbrus: String,
    idarbv: String,
    imatasv: String,
    ikainisv: String,
    kiekisv: String,
    Sumeurv: String,
    datav: String
});

module.exports = mongoose.model("Kellapvair", kellapvairSchema, "kellap");