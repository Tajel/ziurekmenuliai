var express = require("express");
var router = express.Router();
var Dv = require("../models/dv");
var middleware = require("../middleware");
// var json = require("../doc/dv.json");

//INDEX - show all dv
router.get("/", middleware.isLoggedIn, function (req, res) {
    // Get all dv from DB
    Dv.find({
        doc: "darbvad"
    }, function (err, alldv) {
        if (err) {
            console.log(err);
        } else {
            alldv.sort(function (a, b) {
                var textA = a.dvVardasPav.toUpperCase();
                var textB = b.dvVardasPav.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            // console.log(alldv);
            res.render("dv/index", {
                alldv: alldv
            });
        }
    });
});

//  CREATE - add new dv
router.post("/", middleware.isLoggedIn, function (req, res) {
    // Create a new dv and save to DB
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var dv = req.body.dv;
    dv.author = author;
    Dv.create(dv, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to dv page
            // console.log(newlyCreated);
            res.redirect("/dv");
        }
    });
});

//NEW - show form to create new dv
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Dv.find({
        padkodas: {
            $exists: true
        }
    }, function (err, pad) {
        if (!err) {
            console.log("rasti pad: " + pad);
            res.render("dv/new", {
                pad: pad
            });
        }
    });
});

// IPORT to DV
// console.log( require( "../dv.json" ));

router.post("/json", middleware.isLoggedIn, function (req, res) {
    var newDv = require("../dv.json");
    newDv.forEach(function (dv) {
        Dv.create(dv, function (err, newlyCreated) {
            if (err) {
                res.redirect("/dv");
            } else {
                console.log("importuotas darbu vadovas:   " + newlyCreated);
            }
        });
    });
    res.redirect("/dv");
});


//NEW - show form to create new dv
router.get("/import", middleware.isLoggedIn, function (req, res) {
    res.render("dv/import");
});

// EDIT DV ROUTE
router.get("/:id/edit", middleware.checkOwnership, function (req, res) { //  middleware.checkOwnership
    Dv.findById(req.params.id, function (err, founddv) {
        if (!err) {
            Dv.find({
                padkodas: {
                    $exists: true
                }
            }).exec(function (err, pad) {
                if (!err) {
                    res.render("dv/edit", {
                        dv: founddv,
                        pad: pad
                    });
                }
            });
        }
    });
});

// UPDATE DV ROUTE
router.put("/:id", middleware.checkOwnership, function (req, res) {
    // find and update the correct dv
    Dv.findByIdAndUpdate(req.params.id, req.body.dv, function (err, updatedDv) {
        if (err) {
            res.redirect("/dv");
        } else {
            //redirect somewhere(dv list)
            res.redirect("/dv");
        }
    });
});


// DESTROY DV ROUTE
router.delete("/:id", middleware.checkOwnership, function (req, res) {
    Dv.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/dv");
        } else {
            res.redirect("/dv");
        }
    });
});


module.exports = router;