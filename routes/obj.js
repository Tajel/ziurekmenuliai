var express = require("express");
var router = express.Router();
var Obj = require("../models/obj");
var Dv = require("../models/dv");
var middleware = require("../middleware");

//INDEX - show all objekts
router.get("/", middleware.isLoggedIn, function(req, res) {
  // Get all objekts from DB
  Obj.find(
    {
      doc: "objektas"
    },
    function(err, allobjekt) {
      if (err) {
        console.log(err);
      } else {
        allobjekt.sort(function(a, b) {
          var textA = a.objkodas.toUpperCase();
          var textB = b.objkodas.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        console.log(allobjekt);
        res.render("obj/index", {
          allobjekt: allobjekt
        });
      }
    }
  );
});

//CREATE - add new objekt to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
  // get data from form and add to object array
  var doc = req.body.doc;
  var idvVardasPav = req.body.idvVardasPav;
  var objkodas = req.body.objkodas;
  var objpav = req.body.objpav;
  var author = {
    id: req.user._id,
    username: req.user.username
  };

  var newObj = {
    doc: doc,
    idvVardasPav: idvVardasPav,
    objkodas: objkodas,
    objpav: objpav,
    author: author
  };
  // Create a new object and save to DB
  Obj.create(newObj, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to obj page
      console.log(newlyCreated);
      res.redirect("/obj");
    }
  });
});

//NEW - show form to create new objekt
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Dv.find(
    {
      doc: "darbvad"
    },
    function(err, allDv) {
      if (!err) {
        console.log("rasti dv: " + allDv);
        res.render("obj/new", { allDv: allDv });
      }
    }
  );
});

// EDIT OBJ ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
  //  middleware.checkOwnership
  Obj.findById(req.params.id, function(err, foundObj) {
    if (!err) {
      Dv.find(
        {
          doc: "darbvad"
        },
        function(err, allDv) {
          if (!err) {
            res.render("obj/edit", {
              obj: foundObj,
              allDv: allDv
            });
          }
        }
      );
    }
  });
});

// UPDATE OBJ ROUTE
router.put("/:id", middleware.isLoggedIn, middleware.checkOwnership, function(
  req,
  res
) {
  // find and update the correct obj
  Obj.findByIdAndUpdate(req.params.id, req.body.obj, function(err, updatedObj) {
    if (err) {
      res.redirect("/obj");
    } else {
      //redirect somewhere(obj list)
      res.redirect("/obj");
    }
  });
});

// DESTROY OBJ ROUTE
router.delete(
  "/:id",
  middleware.isLoggedIn,
  middleware.checkOwnership,
  function(req, res) {
    Obj.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.redirect("/obj");
      } else {
        res.redirect("/obj");
      }
    });
  }
);

module.exports = router;
