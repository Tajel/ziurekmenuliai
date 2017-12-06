var mongoose = require("mongoose");

var dataSchema = new mongoose.Schema({
    doc: String,
    baze: String,
    padkodas: String,
    ipadkodas: String,
    padpavadinimas: String,
    trrus: String,
    itrrus: String,
    trkodas: String,
    itrkodas: String,
    trtipas: String,
    itrtipas: String,
    trkateg: String,
    itrkateg: String,
    kurrusis: String,
    ikurrusis: String,
    kurkodas: String,
    ikurkodas: String,
    kuruzpkodas: String,
    kuruzppav: String,
    kuruzpkortnr: String,
    imonessutrumpkodas: String,
    imonespavadinimas: String,
    imonesimkodas: Number,
    imonespvmkodas: Number,
    imonesadresas: String,
    ivedimodata: Date,
    dvkodas: String,
    dvVardasPav: String,
    darbpavadinimas: String,
    objkodas: String,
    objpav: String,
    pagvair: String,
    ipagvair: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
});

module.exports = mongoose.model("DataSum", dataSchema);