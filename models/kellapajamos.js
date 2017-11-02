var mongoose = require("mongoose");

var kellapajamosSchema = new mongoose.Schema({
    doc: String,
    kellap: String,
    data: String,
    ridapr: String,
    ridapab: String,
    kurpr: String,
    kurpab: String,
    idarbvnt: String,
    trikain: String,
    iadarbrus: String,
    imatas: String,
    ikainis: String,
    kiekis: String,
    sumeur: String,
    idvVadasPav: String,
    iobjkodas: String,
    iobjpav: String,
    imonkodas: String,


    marke: String,
    modelis: String,
    valstnr: String,
    autoObjectId: String,
    inventnr: String,
    atsaking: String,
    baze: String,
    drcivil: String,
    drkasko: String,
    euro: String,
    gammetai: Number,
    kurrusis: String,
    ikurrusis: String,
    padkodas: String,
    ipadkodas: String,
    pagvair: String,
    ipagvair: String,
    trkateg: String,
    itrkateg: String,
    trrus: String,
    itrrus: String,
    trtipas: String,
    itrtipas: String,
    vinjet: String,

    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Kellapajamos", kellapajamosSchema, "kellap");