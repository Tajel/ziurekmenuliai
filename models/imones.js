var mongoose = require("mongoose");

var imoneSchema = new mongoose.Schema({
    doc: String,
    imonessutrumpkodas: String,
    imonespavadinimas: String,
    imonesimkodas: Number,
    imonespvmkodas: String,
    imonesadresas: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
});

module.exports = mongoose.model("Imone", imoneSchema, 'dataSum');