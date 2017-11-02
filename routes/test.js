var express = require("express");
var router = express.Router();
// var Auto = require("../models/auto");
var Kellap = require("../models/kellap");
var Autokellap = require("../models/autokellap");
var Autokrov = require("../models/auto");
var Data = require("../models/auto");
var middleware = require("../middleware");


router.get("/", middleware.isLoggedIn, function(req, res) {
    // Get all Autokrov from DB
    console.log(req.body.autoObjectId)
    Autokrov.find({
        _id: req.body.autoObjectId
    }).populate("ikainis").exec(function(err, ikainis) {
        if (err) {
            console.log(err);
        } else {
            console.log(ikainis)
            //render show template with that campground
            res.render("test/index", {
                ikainis: ikainis
            });
        }
    });
});
module.exports = router;