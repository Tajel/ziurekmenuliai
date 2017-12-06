var express = require("express");
var router = express.Router();
var Automm = require("../models/auto");
var Kellap = require("../models/kellap");
var Autokellap = require("../models/autokellap");
var middleware = require("../middleware");

//INDEX - show all Automm
router.get("/", middleware.isLoggedIn, function(req, res) {
  // Get all Automm from DB
  Automm.find(
    {
      doc: "automm"
    },
    function(err, alltrmm) {
      if (err) {
        console.log(err);
      } else {
        alltrmm.sort(function(a, b) {
          var textA = a.vairVardPav.toUpperCase();
          var textB = b.vairVardPav.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        // console.log("Suvesti lengvieji automobiliai"+alltrlen);
        res.render("automm/index", {
          alltrmm: alltrmm
        });
      }
    }
  );
});

//CREATE - add new Automm to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
  // get data from form and add to Automm array
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var automm = req.body.automm;
  automm.author = author;
  // Create a new Automm and save to DB
  Autokellap.findOne(
    {
      doc: "automm"
    },
    function(err, result) {
      if (err) {
        console.log(err);
      }
      if (!result) {
        Autokellap.create(
          {
            doc: "automm"
          },
          function(err, auto) {
            if (!err) {
              Automm.create(automm, function(err, newlyCreated) {
                if (err) {
                  console.log(err);
                } else {
                  newlyCreated.save();
                  //redirect back to Automm page
                  console.log(newlyCreated);
                  auto.auto.push(newlyCreated);
                  auto.save();
                  res.redirect("/automm");
                }
              });
            }
          }
        );
      } else {
        Automm.create(automm, function(err, newlyCreated) {
          if (err) {
            console.log(err);
          } else {
            newlyCreated.save();
            //redirect back to automm page
            console.log(newlyCreated);
            result.auto.push(newlyCreated);
            result.save();
            res.redirect("/automm");
          }
        });
      }
    }
  );
});

//NEW - show form to create new Automm
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Automm.find({
    $or: [
      {
        padkodas: {
          $exists: true
        }
      },
      {
        trrus: {
          $exists: true
        }
      },
      {
        trtipas: {
          $exists: true
        }
      },
      {
        vairVardPav: {
          $exists: true
        }
      },
      {
        kurrusis: {
          $exists: true
        }
      },
      {
        dvVadasPav: {
          $exists: true
        }
      }
    ]
  }).exec(function(err, dataSum) {
    if (!err) {
      // console.log("rasti Automm: " + dataSum);
      res.render("automm/new", {
        data: dataSum
      });
      // console.log("rasti Automm: " + dataSum);
    }
  });
});

// // SHOW - shows all kellaps from one Automm ******* VIEW DAR NESUTVARKYTAS
// router.get("/:id/mmkellap", function(req, res){
//     //find the Automm with provided ID
//     Kellap.find({autoObjectId:req.params.id}).exec(function(err, foundtrmmkellap){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundtrmmkellap)
//             //render show template with that Automm kallaps
//             res.render("automm/showkellap", {foundtrmmkellap: foundtrmmkellap});
//         }
//     });
// });

// // SHOW - shows detailed info about Automm
// router.get("/:id", function(req, res){
//     //find the Automm with provided ID
//     Automm.findById(req.params.id).exec(function(err, foundtransport){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundtransport)
//             //render show template with that Automm
//             res.render("autolen/show", {autolen: foundtransport});
//         }
//     });
// });

// EDIT Automm ROUTE
router.get("/:id/edit", middleware.checkOwnership, function(req, res) {
  Automm.findById(req.params.id, function(err, foundtransport) {
    if (!err) {
      console.log("*** rasta MM pr redagavimui: " + foundtransport);
      Automm.find({
        $or: [
          {
            padkodas: {
              $exists: true
            }
          },
          {
            trrus: {
              $exists: true
            }
          },
          {
            trtipas: {
              $exists: true
            }
          },
          {
            vairVardPav: {
              $exists: true
            }
          },
          {
            kurrusis: {
              $exists: true
            }
          },
          {
            dvVadasPav: {
              $exists: true
            }
          }
        ]
      }).exec(function(err, dataSum) {
        if (!err) {
          console.log("rasti Automm: " + dataSum);
          res.render("automm/edit", {
            automm: foundtransport,
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
  Automm.findByIdAndUpdate(req.params.id, req.body.automm, function(
    err,
    updatedTransport
  ) {
    if (err) {
      res.redirect("/automm");
    } else {
      //redirect somewhere(Automech show page)
      res.redirect("/automm");
    }
  });
});

// DESTROY Aotokrov ROUTE
router.delete(
  "/:id",
  middleware.isLoggedIn,
  middleware.checkOwnership,
  function(req, res) {
    Automm.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.redirect("/automm");
      } else {
        res.redirect("/automm");
      }
    });
  }
);

module.exports = router;
