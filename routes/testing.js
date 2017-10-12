var express = require("express");
var router  = express.Router();
var dataSum = require("../models/data");
var middleware = require("../middleware");


router.delete("/", function(req, res){
    var id = require("../import.json");
    id.forEach(function(id){
        dataSum.findByIdAndRemove(id, function(err){
            if(err){
                res.redirect("/imones");
            } else {
                res.redirect("/imones");
            }
        });
    });
}); 