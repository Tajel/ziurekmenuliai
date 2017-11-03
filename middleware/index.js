var Data = require("../models/auto");
var Kellap = require("../models/kellap");
var Ikainis = require("../models/autoik");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Data.findById(req.params.id, function(err, found) {
            if (err || !found) {
                req.flash("error", "Nerastas irasas");
                res.redirect("back");
            } else {
                // does user own the campground?
                if (found.author.id.equals(req.user._id) || req.user.isAdmin) {
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

middlewareObj.checkkellapOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Kellap.findById(req.params.id, function(err, found) {
            if (err || !found) {
                req.flash("errr", "Nerastas irasas")
                res.redirect("back");
            } else {
                // does user own the comment?
                if (found.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "jus neturite teises siam veiksmui atlikti");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "jus neturite teises siam veiksmui atlikti");
        res.redirect("back");
    }
}

middlewareObj.checkikainisOwnership =function(req, res, next){
	if(req.isAuthenticated()){
		Ikainis.findById(req.params.ikainisId, function(err, found){
			if(err || !found){
                req.flash("error", "nerastas irasas")
				res.redirect("back");
			} else {
				// Does the user own the auto?
				// console.log(foundCampground.author.id);
				// console.log(req.user.id);
				if(found.author.id.equals(req.user._id) || req.user.isAdmin){
					next();
				} else {
                    req.flash("error", "Jus neturite teises siam veiksmui atlikti")
					res.redirect("back");
				}
			}
		});
	} else {
        req.flash("error", "Jus neturite teises siam veiksmui atlikti")
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Veiksmas negalimas, Jus turite buti prisijunges");
    res.redirect("/login");
}

module.exports = middlewareObj;