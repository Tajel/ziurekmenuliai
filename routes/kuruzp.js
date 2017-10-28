var express = require("express");
var router  = express.Router();
var Kuruzp = require("../models/kuruzp");
var middleware = require("../middleware");


//INDEX - show all kuruzp
router.get("/", middleware.isLoggedIn, function(req, res){
    // Get all kuruzp from DB
    Kuruzp.find({doc:"kurosaltinis"}, function(err, allkuruzp){
       if(err){
           console.log(err);
       } else {
           allkuruzp.sort(function(a, b) {
                var textA = a.kurouzpkodas.toUpperCase();
                var textB = b.kurouzpkodas.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                console.log(allkuruzp);
           res.render("kuruzp/index",{allkuruzp:allkuruzp});
       }
    });
});

//CREATE - add new kuruzp to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to kuruzp array
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var doc = req.body.doc;
    var kurouzpkodas = req.body.kurouzpkodas;
    var kurouzppav = req.body.kurouzppav;
    var kurouzpkortnr = req.body.kurouzpkortnr;
    
    var newkuruzp = {doc: doc, kurouzpkodas: kurouzpkodas, kurouzppav: kurouzppav, kurouzpkortnr:kurouzpkortnr, author:author}
    // Create a new kuruzp and save to DB
    Kuruzp.create(newkuruzp, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to kuruzp page
            console.log(newlyCreated);
            res.redirect("/kuruzp");
        }
    });
});

//NEW - show form to create new kuruzp
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("kuruzp/new"); 
});

// EDIT kuruzp ROUTE
router.get("/:id/edit",middleware.isLoggedIn, middleware.checkOwnership, function(req, res){        //  middleware.checkOwnership
    Kuruzp.findById(req.params.id, function(err, foundKuruzp){
        res.render("kuruzp/edit", {kuruzp: foundKuruzp});
    });
});

// UPDATE kuruzp ROUTE
router.put("/:id",middleware.isLoggedIn, function(req, res){
    // find and update the correct kuruzp
    Kuruzp.findByIdAndUpdate(req.params.id, req.body.kuruzp, function(err, updatedkuruzp){
       if(err){
           res.redirect("/kuruzp");
       } else {
           //redirect somewhere(kuruzp list)
           res.redirect("/kuruzp/");
       }
    });
});

// DESTROY kuruzp ROUTE
router.delete("/:id",middleware.isLoggedIn, middleware.checkOwnership, function(req, res){
   Kuruzp.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/kuruzp");
      } else {
          res.redirect("/kuruzp");
      }
   });
});


module.exports = router;