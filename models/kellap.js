var mongoose = require("mongoose");

var kellapSchema = new mongoose.Schema({
    doc:String,
    kellap:String,
    data: String,
    ridapr: String,
    ridapab: String,
    kurpr: String,
    kurpab: String,
    idarb: String,
    imatas: String,
    ikainis: String,
    kiekis: String,
    Sumeur: String,
    idvVadasPav:String,
    iobjkodas:String,
    iobjpav:String,
    imonkodas:String,
    
    ipilnas:String,
    idarbv: String,
    imatasv: String,
    ikainisv: String,
    kiekisv: String,
    Sumeurv: String,
    datav: String,
    
    kurrusis: String,
    kurouzpkodas: String,
    kiekiskur: String,
    datakur: String,
    kursum: String,
    kurnorm: String,
    kursunaud: String,
    
    marke: String,
    modelis: String,
    valstnr: String,
    id: String,
    inventnr:String,
    atsaking:String,
    baze:String,
    drcivil:String,
    drkasko:String,
    euro:String,
    gammetai:Number,
    kurrusis:String,
    ikurrusis:String,
    padkodas:String,
    ipadkodas:String,
    pagvair:String,
    ipagvair:String,
    trkateg:String,
    itrkateg:String,
    trrus:String,
    itrrus:String,
    trtipas:String,
    itrtipas:String,
    vinjet:String,
   
    author: {
        id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
        username: String
    }
});

module.exports = mongoose.model("Kellap", kellapSchema, "kellap");