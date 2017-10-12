var Transport = require("../models/auto");
var Kellapas = require("../models/kellap");
var Imones = require("../models/imones");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Transport.findById(req.params.id, function(err, foundtransport){
           if(err){
               req.flash("error", "Nerastas transport");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundtransport.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}
middlewareObj.checkimonesOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Imones.findById(req.params.id, function(err, foundimone){
           if(err){
               req.flash("error", "Nerasta imone");
               res.redirect("back");
           }  else {
               // does user own the imone?
            if(foundimone.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


middlewareObj.checkkellapOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Kellapas.findById(req.params.id, function(err, foundKellapas){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundKellapas.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;