var express = require("express");
var router = express.Router();
var Autonuoma = require("../models/auto");
var middleware = require("../middleware");


//INDEX - show all Autonuoma
router.get("/", middleware.isLoggedIn, function(req, res) {
    // Get all Autonuoma from DB
    Autonuoma.find({
        doc: "autonuoma"
    }, function(err, alltrnuom) {
        if (err) {
            console.log(err);
        } else {
            alltrnuom.sort(function(a, b) {
                var textA = a.marke.toUpperCase();
                var textB = b.marke.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            // console.log("Suvesti nuomoti automobiliai"+alltrlen);
            res.render("autonuoma/index", {
                alltrnuom: alltrnuom
            });
        }
    });
});

//CREATE - add new Autonuoma to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to Autonuoma array
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var autonuoma = req.body.autonuoma
    autonuoma.author = author;
    // Create a new Autonuoma and save to DB
    Autonuoma.create(autonuoma, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to Autonuoma page
            console.log(newlyCreated);
            res.redirect("/autonuoma");
        }
    });
});

//NEW - show form to create new Autonuoma
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Autonuoma.find({
        $or: [{
            padkodas: {
                $exists: true
            }
        }, {
            trrus: {
                $exists: true
            }
        }, {
            kurrusis: {
                $exists: true
            }
        }]
    }).exec(function(err, dataSum) {
        if (!err) {
            // console.log("rasti Autonuoma: " + dataSum);
            res.render("autonuoma/new", {
                data: dataSum
            });
            console.log("rasti autonuoma: " + dataSum);
        }
    });
});

// SHOW - shows all kellaps from one Autonuoma ******* VIEW DAR NESUTVARKYTAS
router.get("/:id/krovkellap", function(req, res) {
    //find the Autonuoma with provided ID
    Autonuoma.findById(req.params.id).populate("kellapas").exec(function(err, foundtransport) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundtransport)
            //render show template with that Autonuoma kallaps
            res.render("autonuoma/showkellap", {
                autonuoma: foundtransport
            });
        }
    });
});
// SHOW - shows detailed info about Autonuoma
router.get("/:id", function(req, res) {
    //find the Autonuoma with provided ID
    Autonuoma.findById(req.params.id).exec(function(err, foundtransport) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundtransport)
            //render show template with that Autonuoma
            res.render("autonuoma/show", {
                autonuoma: foundtransport
            });
        }
    });
});

// EDIT Autonuoma ROUTE
router.get("/:id/edit", middleware.checkOwnership, function(req, res) {
    Autonuoma.findById(req.params.id, function(err, foundtransport) {
        if (!err) {
            // console.log("*** rasta tr pr redagavimui: " + foundtransport);
            Autonuoma.find({
                $or: [{
                    padkodas: {
                        $exists: true
                    }
                }, {
                    trrus: {
                        $exists: true
                    }
                }, {
                    kurrusis: {
                        $exists: true
                    }
                }]
            }).exec(function(err, dataSum) {
                if (!err) {
                    // console.log("rasti Autonuoma: " + dataSum);
                    res.render("autonuoma/edit", {
                        autonuoma: foundtransport,
                        data: dataSum
                    });
                }
            });
        }
    });
});

// UPDATE Automech ROUTE
router.put("/:id", middleware.checkOwnership, function(req, res) {
    // find and update the correct Aotokrov
    Autonuoma.findByIdAndUpdate(req.params.id, req.body, function(err, updatedTransport) {
        if (err) {
            res.redirect("/autonuoma");
        } else {
            //redirect somewhere(Automech show page)
            res.redirect("/autonuoma/" + req.params.id);
        }
    });
});

// DESTROY Aotokrov ROUTE
router.delete("/:id", middleware.isLoggedIn, middleware.checkOwnership, function(req, res) {
    Autonuoma.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/autonuoma");
        } else {
            res.redirect("/autonuoma");
        }
    });
});


module.exports = router;