var express         = require("express");
var router          = express.Router({mergeParams: true});
var async           = require("async");
var Kellap          = require("../models/kellap");
var Kellapajamos    = require("../models/kellapajamos");
var Autokellap      = require("../models/autokellap");
var Obj             = require("../models/obj");
var DV              = require("../models/dv");
var KurUzp          = require("../models/kuruzp");
var Imone           = require("../models/imones");
var Ikainis         = require("../models/autoik");
var middleware      = require("../middleware");

//  Pajamos New
router.get("/new", middleware.isLoggedIn, function(req, res){
    async.series({
        auto: function(callback) {
            Kellap.findById(req.params.id).exec(function(err, auto){
                if(!err){
                    callback(null, auto);
                    }
                })
            },
        objektas: function(callback) {
            Obj.find({doc:'objektas'}).exec(function(err, objektas){
                if(!err){
                    callback(null, objektas);
                    }
                })
            },
        dv: function(callback) {
            DV.find({doc:'darbvad'}).exec(function(err, dv) {
                if(!err){
                    callback(null, dv);
                    }
                })
            },
        imone: function(callback) {
            Imone.find({doc:'imone'}).exec(function(err, imone) {
                if(!err){
                    callback(null, imone);
                    }
                })
            },
        ikainis: function(callback) {
            Kellap.findById(req.params.id).exec(function(err, auto){
                if(!err){
                    Ikainis.find({ $and: [ { doc:'autoik' }, { autoid:auto.autoObjectId }] }).exec(function(err, ikainis){
                        if(!err){
                            callback(null, ikainis);
                            }
                        })
                    }
                })
            }
        },
        function(err, response) {
            if(err){
            console.log('=================================')
            console.log(err.message)
            }else{
                // console.log('=================================')
                console.log("=============response==============" + response)
                res.render("kellapajamos/new", {data:response});
            }
        }
    );
});

//  PAJAMOS Create
router.post("/",middleware.isLoggedIn,function(req, res){
  //lookup kellap using ID
  Kellap.findById(req.params.id, function(err, kellap){
      if(err){
          console.log(err);
          res.redirect("/kellap");
      } else {
        Kellapajamos.create(req.body.kellap, function(err, kellapdata){
          if(err){
              console.log(err);
          } else {
              //add username and id to pajamos
              kellapdata.author.id = req.user._id;
              kellapdata.author.username = req.user.username;
              //save pajamos
              kellapdata.save();
              kellap.pajamos.push(kellapdata);
              kellap.save();
            //   console.log(kellapdata);
              req.flash('success', 'Suvestas objektas!'+req.body.kellap["iobjkodas"]);
              res.redirect('/kellap/' + kellap._id +'/detail');
          }
        });
      }
  });
});

router.get("/:pajamosId/edit", middleware.isLoggedIn, function(req, res){
    
    async.series({
        kellapPajamos: function(callback) {
            Kellapajamos.findById(req.params.pajamosId, function(err, paj) {
                if(!err){
                    callback(null, paj)
                }
            })  
        },
        auto: function(callback) {
            Kellap.findById(req.params.id).exec(function(err, auto){
                if(!err){
                    callback(null, auto);
                    }
                })
            },
        objektas: function(callback) {
            Obj.find({doc:'objektas'}).exec(function(err, objektas){
                if(!err){
                    callback(null, objektas);
                    }
                })
            },
        dv: function(callback) {
            DV.find({doc:'darbvad'}).exec(function(err, dv) {
                if(!err){
                    callback(null, dv);
                    }
                })
            },
        imone: function(callback) {
            Imone.find({doc:'imone'}).exec(function(err, imone) {
                if(!err){
                    callback(null, imone);
                    }
                })
            },
        ikainis: function(callback) {
            Kellap.findById(req.params.id).exec(function(err, auto){
                if(!err){
                    Ikainis.find({ $and: [ { doc:'autoik' }, { autoid:auto.autoObjectId }] }).exec(function(err, ikainis){
                        if(!err){
                            callback(null, ikainis);
                            }
                        })
                    }
                })
            }
        },
        function(err, response) {
            if(err){
            // console.log('=================================')
            // console.log(err)
            }else{
                console.log('=================================')
                // console.log("=============response==============" + response)
                res.render("kellapajamos/edit", {data:response, kellapId:req.params.id, pajamosId:req.params.pajamosId});
            }
        }
    );
});

router.put("/:pajamosId", function(req, res){
  Kellapajamos.findByIdAndUpdate(req.params.pajamosId, req.body.kellap, function(err, kellap){
      if(err){
          res.render("edit");
      } else {
          res.redirect('/kellap/' + req.params.id +'/detail');
      }
  }); 
});

router.delete("/:pajamosId",middleware.isLoggedIn, function(req, res){
    Kellapajamos.findByIdAndRemove(req.params.pajamosId, function(err){
        if(err){
            console.log("PROBLEM!");
        } else {
            res.redirect('/kellap/' + req.params.id +'/detail');
        }
    })
});

module.exports = router;