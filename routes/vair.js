var express = require("express");
var router = express.Router();
var Vair = require("../models/vair");
var middleware = require("../middleware");
// var json = require("../doc/dv.json");

//INDEX - show all VAIR
router.get("/", middleware.isLoggedIn, function(req, res) {
  // Get all vair from DB
  Vair.find(
    {
      doc: "vairuot"
    },
    function(err, allvair) {
      if (err) {
        console.log(err);
      } else {
        allvair.sort(function(a, b) {
          var textA = a.vairVardPav.toUpperCase();
          var textB = b.vairVardPav.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        // console.log(allvair);
        res.render("vair/index", {
          allvair: allvair
        });
      }
    }
  );
});

//  CREATE - add new vair
router.post("/", middleware.isLoggedIn, function(req, res) {
  // Create a new vair and save to DB
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var vair = req.body.vair;
  vair.author = author;
  Vair.create(vair, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to vair page
      // console.log(newlyCreated);
      res.redirect("/vair");
    }
  });
});

//NEW - show form to create new vair
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Vair.find(
    {
      padkodas: {
        $exists: true
      }
    },
    function(err, pad) {
      if (!err) {
        console.log("rasti pad: " + pad);
        res.render("vair/new", {
          pad: pad
        });
      }
    }
  );
});

// IPORT to VAIR
// console.log( require( "../dv.json" ));

router.post("/json", middleware.isLoggedIn, function(req, res) {
  var newVair = require("../vair.json");
  newVair.forEach(function(vair) {
    Vair.create(vair, function(err, newlyCreated) {
      if (err) {
        res.redirect("/vair");
      } else {
        console.log("importuotas vairuotojas:   " + newlyCreated);
      }
    });
  });
  res.redirect("/vair");
});

//NEW - show form to create new vair
router.get("/import", middleware.isLoggedIn, function(req, res) {
  res.render("vair/import");
});

// EDIT VAIR ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
  //  middleware.checkOwnership
  Vair.findById(req.params.id, function(err, foundvair) {
    if (!err) {
      Vair.find({ padkodas: { $exists: true } }).exec(function(err, pad) {
        if (!err) {
          res.render("vair/edit", { vair: foundvair, pad: pad });
        }
      });
    }
  });
});

// UPDATE VAIR ROUTE
router.put("/:id", middleware.isLoggedIn, middleware.checkOwnership, function(
  req,
  res
) {
  // find and update the correct dv
  Vair.findByIdAndUpdate(req.params.id, req.body.vair, function(
    err,
    updatedVair
  ) {
    if (err) {
      res.redirect("/vair");
    } else {
      //redirect somewhere(VAIR list)
      res.redirect("/vair");
    }
  });
});

// DESTROY DV ROUTE
router.delete(
  "/:id",
  middleware.isLoggedIn,
  middleware.checkOwnership,
  function(req, res) {
    Vair.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.redirect("/vair");
      } else {
        res.redirect("/vair");
      }
    });
  }
);

// SHOW - shows detailed info about Vair
router.get("/:id", middleware.isLoggedIn, function(req, res) {
  //find the Vair with provided ID
  Vair.findById(req.params.id)
    .populate("ikainis")
    .exec(function(err, foundvair) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundvair);
        //render show template with that Vair
        res.render("vair/show", {
          vair: foundvair
        });
      }
    });
});

module.exports = router;
