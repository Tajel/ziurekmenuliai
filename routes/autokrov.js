var express = require("express");
var router  = express.Router();
var Autokrov = require("../models/auto");
var Kellap = require("../models/kellap");
var Autokellap = require("../models/autokellap");
var middleware = require("../middleware");


//INDEX - show all Autokrov
router.get("/", middleware.isLoggedIn, function(req, res){
    // Get all Autokrov from DB
    Autokrov.find({doc:"autokrov"}, function(err, alltrkr){
       if(err){
           console.log(err);
       } else {
           alltrkr.sort(function(a, b) {
                var textA = a.marke.toUpperCase();
                var textB = b.marke.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                // console.log("Suvesti kroviniai automobiliai"+alltrkr);
          res.render("autokr/index",{alltrkr:alltrkr});
       }
    });
});

//CREATE - add new Autokrov to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to Autokrov array
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    // console.log('req.body.autokr   ' +req.body.autokr);
    // req.body.autokr = req.sanitize(req.body.autokr);
    // console.log('req.body.autokr sanitized  ' +req.body.autokr);
    var autokr = req.body.autokr
        autokr.author = author;
    // Create a new Autokrov and save to DB
    Autokellap.findOne({doc:'autokr'}, function(err, result){
        if(err){
            console.log(err);
        }if(!result){
            Autokellap.create({doc:'autokr'}, function(err, auto){
                if(!err){
                    Autokrov.create(autokr, function(err, newlyCreated){
                        if(err){
                            console.log(err);
                        } else {
                            newlyCreated.save();
                            //redirect back to autokrov page
                            // console.log(newlyCreated);
                            auto.auto.push(newlyCreated);
                            auto.save();
                            res.redirect("/autokrov");
                        }
                    });
                }
            });
        } else {
            Autokrov.create(autokr, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    newlyCreated.save();
                    //redirect back to autokrov page
                    // console.log(newlyCreated);
                    result.auto.push(newlyCreated);
                    result.save();
                    res.redirect("/autokrov");
                }
            });
        }
    });
});

//NEW - show form to create new Autokrov
router.get("/new", middleware.isLoggedIn, function(req, res){
    Autokrov.find({$or:[{ padkodas: { $exists: true } },{ trrus: { $exists: true } },{ trtipas: { $exists: true } },{ vairVardPav: { $exists: true } },{ kurrusis: { $exists: true } }]}).exec(function (err, dataSum) {
        if(!err){
            // console.log("rasti autokrov: " + dataSum);
            res.render("autokr/new", {data:dataSum}); 
            // console.log("rasti autokrov: " + dataSum);
        }
    });
});

// SHOW - shows all kellaps from one Autokrov ******* VIEW DAR NESUTVARKYTAS
router.get("/:id/kellap", function(req, res){
    //find the Autokrov with provided ID
    Kellap.findById(req.params.id, function(err, foundkrid){
        if(err){
            console.log(err);
        } else {
            // console.log(foundkrid)
            //render show template with that Autokrov kallap List
            res.render("kellap/showkr", {foundkrid:foundkrid});
        }
    });
});
// SHOW - shows detailed info about Aotokrov
router.get("/:id", function(req, res){
    //find the Autokrov with provided ID
    Autokrov.findById(req.params.id).populate('ikainis').exec(function(err, foundtransport){
        if(err){
            console.log(err);
        } else {
            console.log(foundtransport)
            //render show template with that Autokrov
            res.render("autokr/show", {autokrov: foundtransport});
        }
    });
});

// EDIT Aotokrov ROUTE
router.get("/:id/edit", middleware.checkOwnership, function(req, res){
    Autokrov.findById(req.params.id, function(err, foundtransport){
        if(!err){
            console.log("*** rasta tr pr redagavimui: " + foundtransport);
            Autokrov.find({$or:[{ padkodas: { $exists: true } },{ trrus: { $exists: true } },{ trtipas: { $exists: true } },{ vairVardPav: { $exists: true } },{ kurrusis: { $exists: true } }]}).exec(function (err, dataSum) {
                if(!err){
                    // console.log("rasti autokrov: " + autokrov);
                    res.render("autokr/edit", {autokr: foundtransport, data:dataSum});
                }
            });
        }
    });
});

// UPDATE Aotokrov ROUTE
router.put("/:id",middleware.checkOwnership, function(req, res){
    // find and update the correct Aotokrov
    Autokrov.findByIdAndUpdate(req.params.id, req.body.autokr, function(err, updatedTransport){
       if(err){
           res.redirect("/autokrov");
       } else {
           //redirect somewhere(Aotokrov show page)
           res.redirect("/autokrov/" + req.params.id);
       }
    });
});

// DESTROY Aotokrov ROUTE
router.deleteisLoggedIn, middleware.checkOwnership, function(req, res){
   Autokrov.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/autokrov");
      } else {
          res.redirect("/autokrov");
      }
   });
});


module.exports = router;