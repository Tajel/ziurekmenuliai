var express         = require("express");
var router          = express.Router({mergeParams: true});
var async           = require("async");
var Kellap          = require("../models/kellap");
var KellapKuras     = require("../models/kellapkuras");
var Autokellap      = require("../models/autokellap");
var KurUzp          = require("../models/kuruzp");
var KurRus          = require("../models/kurrus");
var middleware      = require("../middleware");

//  KURAS New
router.get("/new", middleware.isLoggedIn, function(req, res){
    Kellap.findById(req.params.id).exec(function(err, kellap){
        if(err){
            console.log(err.message);
        }else{
            KurUzp.find({doc:'kurosaltinis'}).exec(function(err, kurosal) {
                if(err){
                    console.log(err.message);
                    }else{
                        res.render("kellapkuras/new", {data:kellap, kuras:kurosal});
                }
            });
        }
    });
});

//  KURAS Create
router.post("/",middleware.isLoggedIn,function(req, res){
  //lookup kellap using ID
  Kellap.findById(req.params.id, function(err, kellap){
      if(err){
          console.log(err);
          res.redirect("/kellap");
      } else {
        KellapKuras.create(req.body.kellap, function(err, kellapdata){
          if(err){
              console.log(err);
          } else {
              //add username and id to kuras
              kellapdata.author.id = req.user._id;
              kellapdata.author.username = req.user.username;
              //save pajamos
              kellapdata.save();
              kellap.kuras.push(kellapdata);
              kellap.save();
            //   console.log(kellapdata);
              req.flash('success', 'Suvestas kuras!');
              res.redirect('/kellap/' + kellap._id +'/detail');
          }
        });
      }
  });
});

router.get("/:kurasId/edit", middleware.isLoggedIn, function(req, res){
    KellapKuras.findById(req.params.kurasId, function(err, kur) {
        if(!err){
            Kellap.findById(req.params.id).exec(function(err, auto){
                if(!err){
                    KurUzp.find({doc:'kurosaltinis'}).exec(function(err, kurosal) {
                        if(!err){
                            res.render("kellapkuras/edit", {kuras:kur,kurosalt:kurosal,data:auto, kellapId:req.params.id, kurasId:req.params.kurasId});
                        }
                    });
                }
            });
        }
    });
});

router.put("/:kurasId", function(req, res){
  KellapKuras.findByIdAndUpdate(req.params.kurasId, req.body.kellap, function(err, kellap){
      if(err){
          res.render("edit");
      } else {
          res.redirect('/kellap/' + req.params.id +'/detail');
      }
  }); 
});

router.delete("/:kurasId",middleware.isLoggedIn, function(req, res){
    KellapKuras.findByIdAndRemove(req.params.kurasId, function(err){
        if(err){
            console.log("PROBLEM!");
        } else {
            res.redirect('/kellap/' + req.params.id +'/detail');
        }
    })
});

module.exports = router;