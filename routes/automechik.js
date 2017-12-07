var express = require("express");
var router = express.Router({
  mergeParams: true
});
var Auto = require("../models/auto");
var Data = require("../models/darbrus");
var Ikainis = require("../models/autoik");
var middleware = require("../middleware");

//Naujas ikainis
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Auto.findById(req.params.id, function(err, auto) {
    if (err || !auto) {
      req.flash("error", "nerastas irasas");
      res.redirect("/automech");
    } else {
      console.log("found auto");
    }
    Data.find(
      {
        doc: "darbrus"
      },
      function(err, darbrus) {
        if (err || !darbrus) {
          req.flash("error", "nerastas irasas");
          res.redirect("/automech");
        } else {
          console.log("found darbrus");
        }
        res.render("automechik/new", {
          auto: auto,
          darbrus: darbrus
        });
      }
    );
  });
});

//Ikainis Create
router.post("/", middleware.isLoggedIn, function(req, res) {
  //lookup auto using ID
  Auto.findById(req.params.id, function(err, auto) {
    if (err) {
      console.log(err);
      res.redirect("/automech");
    } else {
      Ikainis.create(req.body.automechik, function(err, automechik) {
        if (err) {
          console.log(err);
        } else {
          //add ikainis and id to auto
          automechik.author.id = req.user._id;
          automechik.author.username = req.user.username;
          //save ikainis
          automechik.save();
          auto.ikainis.push(automechik);
          auto.save();
          console.log(automechik);
          req.flash("success", "Sukurtas naujas ikainis!");
          res.redirect("/automech/" + auto._id);
        }
      });
    }
  });
});

//  Edit IKAINIS
router.get("/:ikainisId/edit", middleware.checkikainisOwnership, function(
  req,
  res
) {
  // find ikainis by id
  Auto.findById(req.params._id, function(err, found) {
    if (err || !found) {
      req.flash("error", "nerastas irasas");
      console.log(req.params._id);
    }
    Ikainis.findById(req.params.ikainisId, function(err, ikainis) {
      if (err || !ikainis) {
        req.flash("error", "nerastas irasas");
        res.redirect("/automech");
        console.log(err);
      } else {
        Data.find(
          {
            doc: "darbrus"
          },
          function(err, darbrus) {
            if (err || !darbrus) {
              req.flash("error", "nerastas irasas");
              res.redirect("/automech");
            } else {
              console.log("found darbrus");
            }
            res.render("autokrovik/edit", {
              autoid: req.params.id,
              ikainis: ikainis,
              darbrus: darbrus
            });
          }
        );
      }
    });
  });
});
//  UPDATE Edited ikainis
router.put("/:ikainisId", function(req, res) {
  Ikainis.findByIdAndUpdate(req.params.ikainisId, req.body.automechik, function(
    err,
    ikainis
  ) {
    if (err) {
      res.render("edit");
    } else {
      res.redirect("/automech/" + req.body.automechik.autoid);
    }
  });
});
//  DELETE Ikainis
router.delete("/:ikainisId", middleware.isLoggedIn, function(req, res) {
  Ikainis.findByIdAndRemove(req.params.ikainisId, function(err) {
    if (err) {
      console.log("PROBLEM!");
    } else {
      res.redirect("/automech/" + req.params.id);
    }
  });
});

module.exports = router;
