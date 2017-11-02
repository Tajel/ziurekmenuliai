var express = require("express");
var router = express.Router();
var Autolen = require("../models/auto");
var Kellap = require("../models/kellap");
var Autokellap = require("../models/autokellap");
var middleware = require("../middleware");


//INDEX - show all Autolen
router.get("/", middleware.isLoggedIn, function(req, res) {
    // Get all Autolen from DB
    Autolen.find({
        doc: "autolen"
    }, function(err, alltrlen) {
        if (err) {
            console.log(err);
        } else {
            alltrlen.sort(function(a, b) {
                var textA = a.marke.toUpperCase();
                var textB = b.marke.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            // console.log("Suvesti lengvieji automobiliai"+alltrlen);
            res.render("autolen/index", {
                alltrlen: alltrlen
            });
        }
    });
});

// //CREATE - add new Autolen to DB
// router.post("/", middleware.isLoggedIn, function(req, res){
//     // get data from form and add to Autolen array
//     var author = {
//         id: req.user._id,
//         username: req.user.username
//     };
//     var autolen = req.body.autolen
//         autolen.author = author;
//     // Create a new Autolen and save to DB
//     Autolen.create(autolen, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to Autolen page
//             console.log(newlyCreated);
//             res.redirect("/autolen");
//         }
//     });
// });

//CREATE - add new Autolen to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to Autokrov array
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var autolen = req.body.autolen
    autolen.author = author;
    // Create a new Autolen and save to DB
    Autokellap.findOne({
        doc: 'autolen'
    }, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (!result) {
            Autokellap.create({
                doc: 'autolen'
            }, function(err, auto) {
                if (!err) {
                    Autolen.create(autolen, function(err, newlyCreated) {
                        if (err) {
                            console.log(err);
                        } else {
                            newlyCreated.save();
                            //redirect back to Autolen page
                            console.log(newlyCreated);
                            auto.auto.push(newlyCreated);
                            auto.save();
                            res.redirect("/autolen");
                        }
                    });
                }
            });
        } else {
            Autolen.create(autolen, function(err, newlyCreated) {
                if (err) {
                    console.log(err);
                } else {
                    newlyCreated.save();
                    //redirect back to autokrov page
                    console.log(newlyCreated);
                    result.auto.push(newlyCreated);
                    result.save();
                    res.redirect("/autolen");
                }
            });
        }
    });
});


//NEW - show form to create new Autolen
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Autolen.find({
        $or: [{
            padkodas: {
                $exists: true
            }
        }, {
            trrus: {
                $exists: true
            }
        }, {
            trtipas: {
                $exists: true
            }
        }, {
            vairVardPav: {
                $exists: true
            }
        }, {
            kurrusis: {
                $exists: true
            }
        }]
    }).exec(function(err, dataSum) {
        if (!err) {
            // console.log("rasti Autolen: " + dataSum);
            res.render("autolen/new", {
                data: dataSum
            });
            // console.log("rasti Autolen: " + dataSum);
        }
    });
});

// SHOW - shows all kellaps from one Autolen ******* VIEW DAR NESUTVARKYTAS
router.get("/:id/krovkellap", function(req, res) {
    //find the Autolen with provided ID
    Autolen.findById(req.params.id).populate("kellapas").exec(function(err, foundtrlen) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundtrlen)
            //render show template with that Autolen kallaps
            res.render("autolen/showkellap", {
                autolen: foundtrlen
            });
        }
    });
});
// SHOW - shows detailed info about Autolen
router.get("/:id", function(req, res) {
    //find the Autolen with provided ID
    Autolen.findById(req.params.id).exec(function(err, foundtransport) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundtransport)
            //render show template with that Autolen
            res.render("autolen/show", {
                autolen: foundtransport
            });
        }
    });
});

// EDIT Autolen ROUTE
router.get("/:id/edit", middleware.checkOwnership, function(req, res) {
    Autolen.findById(req.params.id, function(err, foundtransport) {
        if (!err) {
            // console.log("*** rasta tr pr redagavimui: " + foundtransport);
            Autolen.find({
                $or: [{
                    padkodas: {
                        $exists: true
                    }
                }, {
                    trrus: {
                        $exists: true
                    }
                }, {
                    trtipas: {
                        $exists: true
                    }
                }, {
                    vairVardPav: {
                        $exists: true
                    }
                }, {
                    kurrusis: {
                        $exists: true
                    }
                }]
            }).exec(function(err, dataSum) {
                if (!err) {
                    // console.log("rasti Autolen: " + dataSum);
                    res.render("autolen/edit", {
                        autolen: foundtransport,
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
    Autolen.findByIdAndUpdate(req.params.id, req.body.autolen, function(err, updatedTransport) {
        if (err) {
            res.redirect("/autolen");
        } else {
            //redirect somewhere(Automech show page)
            res.redirect("/autolen/" + req.params.id);
        }
    });
});

// DESTROY Aotokrov ROUTE
router.delete("/:id", middleware.isLoggedIn, middleware.checkOwnership, function(req, res) {
    Autolen.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/autolen");
        } else {
            res.redirect("/autolen");
        }
    });
});


module.exports = router;