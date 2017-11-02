var express = require("express");
var router  = express.Router();
var Pad = require("../models/pad");
var middleware = require("../middleware");


//INDEX - show all pads
router.get("/", middleware.isLoggedIn, function(req, res){
    // Get all pads from DB
    Pad.find({doc:"padalinys"}, function(err, allpads){
       if(err){
           console.log(err);
       } else {
           allpads.sort(function(a, b) {
                var textA = a.padkodas.toUpperCase();
                var textB = b.padkodas.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                console.log(allpads);
           res.render("pad/index",{allpads:allpads});
       }
    });
});

//CREATE - add new pad to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to pad array
    var doc = req.body.doc;
    var padkodas = req.body.padkodas;
    var padpavadinimas = req.body.padpavadinimas;
    
    var newPad = {doc: doc, padkodas: padkodas, padpavadinimas: padpavadinimas}
    // Create a new pad and save to DB
    Pad.create(newPad, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to pad page
            console.log(newlyCreated);
            res.redirect("/pad");
        }
    });
});

//NEW - show form to create new pad
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("pad/new"); 
});

// EDIT PAD ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){        //  middleware.checkOwnership
    Pad.findById(req.params.id, function(err, foundPad){
        res.render("pad/edit", {pad: foundPad});
    });
});

// UPDATE PAD ROUTE
router.put("/:id",middleware.isLoggedIn, middleware.checkOwnership, function(req, res){
    // find and update the correct pad
    Pad.findByIdAndUpdate(req.params.id, req.body.pad, function(err, updatedPad){
       if(err){
           res.redirect("/pad");
       } else {
           //redirect somewhere(pad list)
           res.redirect("/pad/");
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.isLoggedIn, middleware.checkOwnership, function(req, res){
   Pad.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/pad");
      } else {
          res.redirect("/pad");
      }
   });
});


module.exports = router;