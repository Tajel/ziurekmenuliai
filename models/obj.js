var mongoose = require("mongoose");

var objSchema = new mongoose.Schema({
    doc: String,
    dvVadasPav: String,
    objkodas: String,
    objpav: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Obj", objSchema, 'dataSum');