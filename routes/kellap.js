var express = require("express");
var router = express.Router();
var async = require("async");
// var Auto = require("../models/auto");
var Kellap = require("../models/kellap");
var Autokellap = require("../models/autokellap");
var Obj = require("../models/obj");
var DV = require("../models/dv");
var KurUzp = require("../models/kuruzp");
var Imone = require("../models/imones");
var Ikainis = require("../models/autoik");
var KellapKuras = require("../models/kellapkuras");
var middleware = require("../middleware");

//INDEX - show all KR Kellaps
router.get("/", middleware.isLoggedIn, function(req, res) {
  // Get all Kellaps from DB
  Kellap.find(
    {
      kellap: "kellapas"
    },
    function(err, allkellap) {
      if (err) {
        console.log(err);
      } else {
        // console.log(allkellap);
        allkellap.sort(function(a, b) {
          //   console.log('rusiavimo elementas: ' +a.data);
          var textA = a.data;
          var textB = b.data;
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        // console.log("Suvesti keliones lapai "+allkellap);
        res.render("kellap/index", {
          allkellap: allkellap
        });
        //   res.render("kellap/indexold",{allkellap:allkellap});
        //   res.render("kellap/test",{data:allkellap});
      }
    }
  );
});

//CREATE - add new Kellap to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
  // get data from form and add to Kellap toss array
  var author = { id: req.user._id, username: req.user.username };
  var kellap = req.body.kellap;
  kellap.author = author;
  // Create a new kellap and save t:authoro DB
  Kellap.create(kellap, function(err, newlykellap) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to Kellap page
      // alert("sukurtas keliones lapas!");
      console.log("sukurtas naujas keliones lapas: " + newlykellap);
      res.redirect("back");
    }
  });
});

//NEW - show form to create new KELLAPAS filtruojama lentele pagal itrrus pasirenkams koks keliones lapas su itrkateg
router.get("/newkr", middleware.isLoggedIn, function(req, res) {
  Autokellap.findOne({
    doc: "autokr"
  })
    .populate("auto", [
      "marke",
      "modelis",
      "valstnr",
      "inventnr",
      "ipagvair",
      "itrrus",
      "itrtipas",
      "baze",
      "ikurrusis"
    ])
    .exec(function(err, dataSum) {
      if (!dataSum) {
        return res.redirect("/autokrov/new");
      }
      if (dataSum === null) {
        return res.redirect("/autokrov/new");
      }
      // {doc:'autokrov'},{marke:true, modelis:true, valstnr:true, inventnr:true, ipagvair:true,ridapr:true,kurpr:true}
      // {$or:[{doc:'auto'},{doc:'vair'}]}).populate("auto").exec(function (err, dataSum){
      if (!err) {
        console.log("rasti autokrov: " + dataSum.auto);
        res.render("kellap/new", {
          data: dataSum.auto
        });
        // console.log("rasti autokrov: " + dataSum);
      }
    });
});
//NEW - show form to create new KELLAPAS filtruojama lentele pagal itrrus pasirenkams koks keliones lapas su itrkateg
router.get("/newmech", middleware.isLoggedIn, function(req, res) {
  Autokellap.findOne({
    doc: "automech"
  })
    .populate("auto", [
      "marke",
      "modelis",
      "valstnr",
      "inventnr",
      "ipagvair",
      "itrrus",
      "itrkateg",
      "baze",
      "ikurrusis"
    ])
    .exec(function(err, dataSum) {
      if (!dataSum) {
        return res.redirect("/automech/new");
      }
      if (dataSum === null) {
        return res.redirect("/automech/new");
      }
      // {doc:'autokrov'},{marke:true, modelis:true, valstnr:true, inventnr:true, ipagvair:true,ridapr:true,kurpr:true}
      // {$or:[{doc:'auto'},{doc:'vair'}]}).populate("auto").exec(function (err, dataSum){
      if (!err) {
        console.log("rasti automech: " + dataSum.auto);
        res.render("kellap/new", {
          data: dataSum.auto
        });
        // console.log("rasti automech: " + dataSum);
      }
    });
});

//NEW - show form to create new KELLAPAS filtruojama lentele pagal itrrus pasirenkams koks keliones lapas su itrkateg
router.get("/newlen", middleware.isLoggedIn, function(req, res) {
  Autokellap.findOne({
    doc: "autolen"
  })
    .populate("auto", [
      "marke",
      "modelis",
      "valstnr",
      "inventnr",
      "ipagvair",
      "itrrus",
      "itrkateg",
      "baze",
      "ikurrusis"
    ])
    .exec(function(err, dataSum) {
      if (!dataSum) {
        return res.redirect("/autolen/new");
      }
      if (dataSum === null) {
        return res.redirect("/autolen/new");
      }
      // {doc:'autokrov'},{marke:true, modelis:true, valstnr:true, inventnr:true, ipagvair:true,ridapr:true,kurpr:true}
      // {$or:[{doc:'auto'},{doc:'vair'}]}).populate("auto").exec(function (err, dataSum){
      if (!err) {
        console.log("rasti autolen: " + dataSum.auto);
        res.render("kellap/new", {
          data: dataSum.auto
        });
        // console.log("rasti autolen: " + dataSum);
      }
    });
});

//NEW - show form to create new KELLAPAS filtruojama lentele pagal itrrus pasirenkams koks keliones lapas su itrkateg
router.get("/newmm", middleware.isLoggedIn, function(req, res) {
  Autokellap.findOne({
    doc: "automm"
  })
    .populate("auto", ["itrrus", "ikurrusis", "vairVardPav", "ipadkodas"])
    .exec(function(err, dataSum) {
      if (!dataSum) {
        return res.redirect("/automm/new");
      }
      if (dataSum === null) {
        return res.redirect("/automm/new");
      }
      // {doc:'autokrov'},{marke:true, modelis:true, valstnr:true, inventnr:true, ipagvair:true,ridapr:true,kurpr:true}
      // {$or:[{doc:'auto'},{doc:'vair'}]}).populate("auto").exec(function (err, dataSum){
      if (!err) {
        console.log("rasti automm: " + dataSum.auto);
        res.render("kellap/newmm", {
          data: dataSum.auto
        });
        // console.log("rasti autolen: " + dataSum);
      }
    });
});

// // SHOW - shows all kellaps from one Autokrov ******* VIEW DAR NESUTVARKYTAS
// router.get("/:id", function(req, res){
//     //find the Autokrov with provided ID
//     Kellap.findById(req.params.id, function(err, foundkrid){
//         if(err){
//             console.log(err);
//         } else {
//             if(foundkrid.doc === "krkellap"){
//                 res.render("kellap/showkr", {foundkrid:foundkrid});
//             }
//             if(foundkrid.doc === "mechkellap"){
//                 res.render("kellap/showmech", {foundkrid:foundkrid});
//             }
//             if(foundkrid.doc === "lenkellap"){
//                 res.render("kellap/showlen", {foundkrid:foundkrid});
//             }
//             if(foundkrid.doc === "nuomkellap"){
//                 res.render("kellap/shownuom", {foundkrid:foundkrid});
//             }
//         }
//     });
// });

//  ***************************
//  SHOW detailed kellap
//  ***************************

// SHOW - shows more info about one KELLAP
router.get("/:id/detail", function(req, res) {
  //find the KELLAP with provided ID
  Kellap.findById(req.params.id)
    .populate("pajamos")
    .populate("kuras")
    .populate("rida")
    .exec(function(err, kellap) {
      if (err) {
        console.log(err);
        return res.redirect("/kellap/" <= kellap.id > +"/rida/new");
      } else {
        console.log("kellap pajamos kuras vair" + kellap);
        //render show template with that KELLAP
        res.render("kellap/detail", {
          kellap: kellap
        });
      }
    });
});

// router.get('/:id/index', middleware.isLoggedIn, function(req, res) {
//     Kellap.findById(req.params.id).exec(function(err, kellap){
//         if(!err){
//             console.log(kellap)
//             res.render("kellap/showkr", {data:kellap});
//         }
//     })
// })

//  EDIT KELLAP ROUTE Suvesti keliones lapo duomenis

router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
  async.series(
    {
      auto: function(callback) {
        Kellap.findById(req.params.id).exec(function(err, auto) {
          if (!err) {
            callback(null, auto);
          }
        });
      },
      objektas: function(callback) {
        Obj.find({
          doc: "objektas"
        }).exec(function(err, objektas) {
          if (!err) {
            callback(null, objektas);
          }
        });
      },
      dv: function(callback) {
        DV.find({
          doc: "darbvad"
        }).exec(function(err, dv) {
          if (!err) {
            callback(null, dv);
          }
        });
      },
      imone: function(callback) {
        Imone.find({
          doc: "imone"
        }).exec(function(err, imone) {
          if (!err) {
            callback(null, imone);
          }
        });
      },
      kuruzp: function(callback) {
        KurUzp.find({
          doc: "kurosaltinis"
        }).exec(function(err, kurosaltinis) {
          if (!err) {
            callback(null, kurosaltinis);
          }
        });
      },
      ikainis: function(callback) {
        Kellap.findById(req.params.id).exec(function(err, auto) {
          if (!err) {
            Ikainis.find({
              $and: [
                {
                  doc: "autoik"
                },
                {
                  autoid: auto.autoObjectId
                }
              ]
            }).exec(function(err, ikainis) {
              if (!err) {
                callback(null, ikainis);
              }
            });
          }
        });
      }
    },
    function(err, response) {
      // response == {one: 'Node.js', two: 'JavaScript'}
      console.log(response);
      res.render("kellap/kelapdetedit", {
        data: response
      });
    }
  );
});
// UPDATE KELLAP ROUTE
router.put(
  "/:id",
  middleware.isLoggedIn,
  middleware.checkkellapOwnership,
  function(req, res) {
    // find and update the correct KELLAP
    Kellap.findByIdAndUpdate(req.params.id, req.body.kellap, function(
      err,
      updatedKellap
    ) {
      if (err) {
        res.redirect("/kellap");
      } else {
        //redirect somewhere(Aotokrov show page)
        res.redirect("/kellap/" + req.params.id);
      }
    });
  }
);

// DESTROY KELLAP ROUTE
router.delete(
  "/:id",
  middleware.isLoggedIn,
  middleware.checkkellapOwnership,
  function(req, res) {
    Kellap.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.redirect("/kellap");
      } else {
        res.redirect("/kellap");
      }
    });
  }
);

module.exports = router;
