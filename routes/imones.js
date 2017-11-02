var express = require("express");
var router = express.Router();
var Imones = require("../models/imones");
var middleware = require("../middleware");


//INDEX - show all imones
router.get("/", middleware.isLoggedIn, function(req, res) {
    // Get all imones from DB
    Imones.find({
        doc: "imone"
    }, function(err, allimones) {
        if (err) {
            console.log(err);
        } else {
            allimones.sort(function(a, b) {
                var textA = a.imonespavadinimas.toUpperCase();
                var textB = b.imonespavadinimas.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            console.log(allimones);
            res.render("imones/index", {
                allimones: allimones
            });
        }
    });
});

//CREATE - add new imone to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to imone array
    var doc = req.body.doc;
    var imonessutrumpkodas = req.body.imonessutrumpkodas;
    var imonespavadinimas = req.body.imonespavadinimas;
    var imonesimkodas = req.body.imonesimkodas;
    var imonespvmkodas = req.body.imonespvmkodas;
    var imonesadresas = req.body.imonesadresas;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newImone = {
        imonessutrumpkodas: imonessutrumpkodas,
        imonespavadinimas: imonespavadinimas,
        imonesimkodas: imonesimkodas,
        imonespvmkodas: imonespvmkodas,
        imonesadresas: imonesadresas,
        author: author,
        doc: doc
    }
    // Create a new imone and save to DB
    Imones.create(newImone, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to imones page
            console.log(newlyCreated);
            res.redirect("/imones");
        }
    });
});

//NEW - show form to create new imone
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("imones/new");
});

// IPORT to IMONE
// console.log( require( "../imone.json" ));

router.post("/json", middleware.isLoggedIn, function(req, res) {
    var newim = require("../imone.json");
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    newim.forEach(function(im) {
        //  console.log("importuojam imone *****:     " + JSON.stringify(im));
        im.author = author;
        Imones.create(im, function(err, newlyCreated) {
            if (!err) {
                return console.log("importuotos imones:   " + newlyCreated);
            }
        });
    });
    res.redirect("/imones");
});


//NEW1 - show form to create new dv
router.get("/import", middleware.isLoggedIn, function(req, res) {
    res.render("imones/import");
});



// SHOW - shows more info about one imone
router.get("/:id", function(req, res) {
    //find the imone with provided ID
    Imones.findById(req.params.id, function(err, foundimone) {
        if (err) {
            console.log(err);
        } else {
            console.log("foundimone" + foundimone)
            //render show template with that imone
            res.render("imones/show", {
                imone: foundimone
            });
        }
    });
});

// EDIT IMONE ROUTE
router.get("/:id/edit", middleware.checkimonesOwnership, function(req, res) {
    Imones.findById(req.params.id, function(err, foundimone) {
        res.render("imones/edit", {
            imone: foundimone
        });
    });
});

// UPDATE IMONE ROUTE
router.put("/:id", middleware.checkOwnership, function(req, res) {
    // find and update the correct imone
    Imones.findByIdAndUpdate(req.params.id, req.body.imone, function(err, updatedImone) {
        if (err) {
            res.redirect("/imones");
        } else {
            //redirect somewhere(show page)
            res.redirect("/imones/" + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkOwnership, function(req, res) {
    Imones.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/imones");
        } else {
            res.redirect("/imones");
        }
    });
});


module.exports = router;