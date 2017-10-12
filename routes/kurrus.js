var express = require("express");
var router  = express.Router();
var Kurrus = require("../models/kurrus");
var middleware = require("../middleware");


//INDEX - show all kurrus
router.get("/", middleware.isLoggedIn, function(req, res){
    // Get all kurrus from DB
    Kurrus.find({doc:"kurorusis"}, function(err, allkurrus){
       if(err){
           console.log(err);
       } else {
           allkurrus.sort(function(a, b) {
                var textA = a.kurorusiskodas.toUpperCase();
                var textB = b.kurorusiskodas.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                console.log(allkurrus);
           res.render("kurrus/index",{allkurrus:allkurrus});
       }
    });
});

//CREATE - add new kurrus to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to kurrus array
    var doc = req.body.doc;
    var kurrusis = req.body.kurrusis;
    var kurorusiskodas = req.body.kurorusiskodas;
    
    var newKurrus = {doc: doc, kurrusis: kurrusis, kurorusiskodas: kurorusiskodas}
    // Create a new kurrus and save to DB
    Kurrus.create(newKurrus, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to kurrus page
            console.log(newlyCreated);
            res.redirect("/kurrus");
        }
    });
});

//NEW - show form to create new kurrus
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("kurrus/new"); 
});

// EDIT KURRUS ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){        //  middleware.checkOwnership
    Kurrus.findById(req.params.id, function(err, foundKurus){
        res.render("kurrus/edit", {kurrus: foundKurus});
    });
});

// UPDATE KURRUS ROUTE
router.put("/:id",middleware.isLoggedIn, function(req, res){
    // find and update the correct kurrus
    Kurrus.findByIdAndUpdate(req.params.id, req.body.kurrus, function(err, updatedKurrus){
       if(err){
           res.redirect("/kurrus");
       } else {
           //redirect somewhere(kurrus list)
           res.redirect("/kurrus/");
       }
    });
});

// DESTROY KURRUS ROUTE
router.delete("/:id",middleware.isLoggedIn, middleware.checkOwnership, function(req, res){
   Kurrus.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/kurrus");
      } else {
          res.redirect("/kurrus");
      }
   });
});


module.exports = router;