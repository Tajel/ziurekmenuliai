var express = require("express");
var router = express.Router();
var Darbrus = require("../models/darbrus");
var middleware = require("../middleware");


//INDEX - show all darbrus
router.get("/", middleware.isLoggedIn, function(req, res) {
    // Get all darbrus from DB
    Darbrus.find({
        doc: "darbrus"
    }, function(err, allDarbrus) {
        if (err) {
            console.log(err);
        } else {
            allDarbrus.sort(function(a, b) {
                var textA = a.darbrus.toUpperCase();
                var textB = b.darbrus.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            console.log(allDarbrus);
            res.render("darbrus/index", {
                alldarbrus: allDarbrus
            });
        }
    });
});

//CREATE - add new darbrus to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to darbrus array
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var doc = req.body.doc;
    var darbrus = req.body.darbrus;
    var vnt = req.body.vnt;
    var newDarbrus = {
        doc: doc,
        darbrus: darbrus,
        vnt: vnt,
        author: author
    }
    // Create a new darbrus and save to DB
    Darbrus.create(newDarbrus, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to darbrus page
            console.log(newlyCreated);
            res.redirect("/darbrus");
        }
    });
});

//NEW - show form to create new darbrus
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("darbrus/new");
});

// EDIT DARBRUS ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) { //  middleware.checkOwnership
    Darbrus.findById(req.params.id, function(err, foundDarbrus) {
        res.render("darbrus/edit", {
            darbrus: foundDarbrus
        });
    });
});

// UPDATE KURRUS ROUTE
router.put("/:id", middleware.isLoggedIn, function(req, res) {
    // find and update the correct kurrus
    Darbrus.findByIdAndUpdate(req.params.id, req.body.darbrus, function(err, updatedDarbrus) {
        if (err) {
            res.redirect("/darbrus");
        } else {
            //redirect somewhere(kurrus list)
            res.redirect("/darbrus/");
        }
    });
});

// DESTROY KURRUS ROUTE
router.delete("/:id", middleware.isLoggedIn, middleware.checkOwnership, function(req, res) {
    Darbrus.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/darbrus");
        } else {
            res.redirect("/darbrus");
        }
    });
});


module.exports = router;