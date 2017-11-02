var express = require("express");
var router = express.Router();
var Automech = require("../models/auto");
var Kellap = require("../models/kellap");
var Autokellap = require("../models/autokellap");
var middleware = require("../middleware");


//INDEX - show all Automech
router.get("/", middleware.isLoggedIn, function(req, res) {
    // Get all Automech from DB
    Automech.find({
        doc: "automech"
    }, function(err, alltrmech) {
        if (err) {
            console.log(err);
        } else {
            alltrmech.sort(function(a, b) {
                var textA = a.marke.toUpperCase();
                var textB = b.marke.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            // console.log("Suvesti mechanzmai: "+alltrkr);
            res.render("automech/index", {
                alltrmech: alltrmech
            });
        }
    });
});

// //CREATE - add new Automech to DB
// router.post("/", middleware.isLoggedIn, function(req, res){
//     // get data from form and add to Automech array
//     var author = {
//         id: req.user._id,
//         username: req.user.username
//     };
//     var automech = req.body.automech
//         automech.author = author;
//     // Create a new Automech and save to DB
//     Automech.create(automech, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to Automech page
//             console.log(newlyCreated);
//             res.redirect("/automech");
//         }
//     });
// });

//CREATE - add new Autokrov to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to Autokrov array
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var automech = req.body.automech
    automech.author = author;
    // Create a new Autokrov and save to DB
    Autokellap.findOne({
        doc: 'automech'
    }, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (!result) {
            Autokellap.create({
                doc: 'automech'
            }, function(err, auto) {
                if (!err) {
                    Automech.create(automech, function(err, newlyCreated) {
                        if (err) {
                            console.log(err);
                        } else {
                            newlyCreated.save();
                            //redirect back to autokrov page
                            console.log(newlyCreated);
                            auto.auto.push(newlyCreated);
                            auto.save();
                            res.redirect("/automech");
                        }
                    });
                }
            });
        } else {
            Automech.create(automech, function(err, newlyCreated) {
                if (err) {
                    console.log(err);
                } else {
                    newlyCreated.save();
                    //redirect back to autokrov page
                    console.log(newlyCreated);
                    result.auto.push(newlyCreated);
                    result.save();
                    res.redirect("/automech");
                }
            });
        }
    });
});

//NEW - show form to create new Automech
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Automech.find({
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
            // console.log("rasti Automech: " + dataSum);
            res.render("automech/new", {
                data: dataSum
            });
            // console.log("rasti Automech: " + dataSum);
        }
    });
});

// SHOW - shows all kellaps from one Automech ******* VIEW DAR NESUTVARKYTAS
router.get("/:id/krovkellap", function(req, res) {
    //find the Automech with provided ID
    Automech.findById(req.params.id).populate("kellapas").exec(function(err, foundtransport) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundtransport)
            //render show template with that Automech kallaps
            res.render("automech/showkellap", {
                automech: foundtransport
            });
        }
    });
});
// SHOW - shows detailed info about Automech
router.get("/:id", function(req, res) {
    //find the Automech with provided ID
    Automech.findById(req.params.id).exec(function(err, foundtransport) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundtransport)
            //render show template with that Automech
            res.render("automech/show", {
                automech: foundtransport
            });
        }
    });
});

// EDIT Automech ROUTE
router.get("/:id/edit", middleware.checkOwnership, function(req, res) {
    Automech.findById(req.params.id, function(err, foundtransport) {
        if (!err) {
            console.log("*** rasta tr pr redagavimui: " + foundtransport);
            Automech.find({
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
                    console.log("rasti Automech: " + dataSum);
                    res.render("automech/edit", {
                        automech: foundtransport,
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
    Automech.findByIdAndUpdate(req.params.id, req.body.automech, function(err, updatedTransport) {
        if (err) {
            res.redirect("/automech");
        } else {
            //redirect somewhere(Automech show page)
            res.redirect("/automech/" + req.params.id);
        }
    });
});

// DESTROY Aotokrov ROUTE
router.delete("/:id", middleware.isLoggedIn, middleware.checkOwnership, function(req, res) {
    Automech.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/automech");
        } else {
            res.redirect("/automech");
        }
    });
});


module.exports = router;