var express = require("express");
var router  = express.Router();
var Trrus = require("../models/trrus");
var middleware = require("../middleware");


//INDEX - show all trrus
router.get("/", middleware.isLoggedIn, function(req, res){
    // Get all pads from DB
    Trrus.find({doc:"trrusis"}, function(err, alltrrus){
       if(err){
           console.log(err);
       } else {
           console.log(alltrrus);
           alltrrus.sort(function(a, b) {
                var textA = a.trrus.toUpperCase();
                var textB = b.trrus.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                console.log(alltrrus);
           res.render("trrus/index",{alltrrus:alltrrus});
       }
    });
});

//CREATE - add new trrus to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to trrus array
    var doc = req.body.doc;
    var trrus = req.body.trrus;
    var trruskodas = req.body.trruskodas;
    
    var newTrrus = {doc: doc, trrus: trrus, trruskodas: trruskodas}
    // Create a new trrus and save to DB
    Trrus.create(newTrrus, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to trrus page
            console.log(newlyCreated);
            res.redirect("/trrus");
        }
    });
});

//NEW - show form to create new trrus
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("trrus/new"); 
});

// EDIT TRRUS ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){        //  middleware.checkOwnership
    Trrus.findById(req.params.id, function(err, foundtrrus){
        res.render("trrus/edit", {trrus: foundtrrus});
    });
});

// UPDATE PAD ROUTE
router.put("/:id",middleware.isLoggedIn, function(req, res){
    // find and update the correct pad
    Trrus.findByIdAndUpdate(req.params.id, req.body.trrus, function(err, updatedtrrus){
       if(err){
           res.redirect("/trrus");
       } else {
           //redirect somewhere(pad list)
           res.redirect("/trrus/");
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.isLoggedIn, middleware.checkOwnership, function(req, res){
   Trrus.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/trrus");
      } else {
          res.redirect("/trrus");
      }
   });
});


module.exports = router;