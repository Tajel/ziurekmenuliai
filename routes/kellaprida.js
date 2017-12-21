var express = require("express");
var router = express.Router({
  mergeParams: true
});
var async = require("async");
var Kellap = require("../models/kellap");
var KellapRida = require("../models/kellaprida");
var Autokellap = require("../models/autokellap");
var middleware = require("../middleware");

//  RIDA New
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Kellap.findById(req.params.id).exec(function(err, kellap) {
    if (err) {
      console.log(err.message);
    } else {
      res.render("kellaprida/new", { kellap: kellap });
    }
  });
});

//  RIDA Create
router.post("/", middleware.isLoggedIn, function(req, res) {
  //lookup kellap using ID
  Kellap.findById(req.params.id, function(err, kellap) {
    if (err) {
      console.log(err);
      res.redirect("/kellap");
    } else {
      KellapRida.create(req.body.kellap, function(err, kellapdata) {
        if (err) {
          console.log(err);
        } else {
          //add username and id to rida
          kellapdata.author.id = req.user._id;
          kellapdata.author.username = req.user.username;
          //save rida
          kellapdata.save();
          kellap.rida.push(kellapdata);
          kellap.save();
          //   console.log(kellapdata);
          req.flash("success", "Suvesta rida ir kuro likuciai!");
          res.redirect("/kellap/" + kellap._id + "/detail");
        }
      });
    }
  });
});

router.get("/:ridaID/edit", middleware.isLoggedIn, function(req, res) {
  KellapRida.findById(req.params.ridaID, function(err, data) {
    if (!err) {
      res.render("Kellaprida/edit", {
        data: data,
        kellapId: req.params.id,
        ridaID: req.params.ridaID
      });
    }
  });
});

router.put("/:ridaID", function(req, res) {
  KellapRida.findByIdAndUpdate(req.params.ridaID, req.body.kellap, function(
    err,
    kellap
  ) {
    if (err) {
      res.render("edit");
    } else {
      res.redirect("/kellap/" + req.params.id + "/detail");
    }
  });
});

router.delete("/:ridaID", middleware.isLoggedIn, function(req, res) {
  KellapRida.findByIdAndRemove(req.params.ridaID, function(err) {
    if (err) {
      console.log("PROBLEM!");
    } else {
      res.redirect("/kellap/" + req.params.id + "/detail");
    }
  });
});

module.exports = router;
