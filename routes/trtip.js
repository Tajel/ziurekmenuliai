var express = require("express");
var router = express.Router();
var Trtip = require("../models/trtip");
var middleware = require("../middleware");


//INDEX - show all trtip
router.get("/", middleware.isLoggedIn, function (req, res) {
    // Get all pads from DB
    Trtip.find({
        doc: "trantipas"
    }, function (err, alltrtip) {
        if (err) {
            console.log(err);
        } else {
            console.log(alltrtip);
            alltrtip.sort(function (a, b) {
                var textA = a.trtipas.toUpperCase();
                var textB = b.trtipas.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            console.log(alltrtip);
            res.render("trtip/index", {
                alltrtip: alltrtip
            });
        }
    });
});

//CREATE - add new trtip to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to trtip array
    var doc = req.body.doc;
    var trtipas = req.body.trtipas;
    var author = {
        id: req.user._id,
        username: req.user.username
    };


    var newtrtip = {
        doc: doc,
        trtipas: trtipas,
        author: author
    }
    // Create a new trtip and save to DB
    Trtip.create(newtrtip, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to trtip page
            console.log(newlyCreated);
            res.redirect("/trtip");
        }
    });
});

//NEW - show form to create new trtip
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("trtip/new");
});

// EDIT trtip ROUTE
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkOwnership, function (req, res) { //  middleware.checkOwnership
    Trtip.findById(req.params.id, function (err, foundtrtip) {
        res.render("trtip/edit", {
            trtip: foundtrtip
        });
    });
});

// UPDATE PAD ROUTE
router.put("/:id", middleware.isLoggedIn, middleware.checkOwnership,
    function (req, res) {
        // find and update the correct pad
        Trtip.findByIdAndUpdate(req.params.id, req.body.trtip, function (err, updatedtrtip) {
            if (err) {
                res.redirect("/trtip");
            } else {
                //redirect somewhere(pad list)
                res.redirect("/trtip/");
            }
        });
    });

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.isLoggedIn, middleware.checkOwnership, function (req, res) {
    Trtip.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/trtip");
        } else {
            res.redirect("/trtip");
        }
    });
});

module.exports = router;