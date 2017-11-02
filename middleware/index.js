var Data = require("../models/auto");
var Kellap = require("../models/kellap");
var Data = require("../models/imones");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Data.findById(req.params.id, function(err, found){
           if(err){
               req.flash("error", "Nerastas irasas");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(found.author.id.equals(req.user._id) || req.user.isAdmin) {
                next();
            } else {
                req.flash("error", "Neturite teisiu siam veiksmui atlikti !");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "Jus nesate prisijunges !");
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
            if(foundimone.author.id.equals(req.user._id) || req.user.isAdmin) {
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
            if(foundKellapas.author.id.equals(req.user._id) || req.user.isAdmin) {
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