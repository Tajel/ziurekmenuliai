var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Vair = require("../models/vair");
var Data = require("../models/darbrus");
var Ikainis = require("../models/vairik");
var middleware = require("../middleware");

//Ikainis New
router.get("/new", middleware.isLoggedIn, function(req, res) {
    // find vairuotojas by ID
    // console.log(req.params.id);
    Vair.findById(req.params.id, function(err, vair) {
        if (!err) {
            console.log('found vair');
        }
        Data.find({
            doc: "darbrus"
        }, function(err, darbrus) {
            if (!err) {
                console.log('found darbrus');
            }
            res.render("vairik/new", {
                vair: vair,
                darbrus: darbrus
            });
        });
    });
});

//Ikainis Create
router.post("/", middleware.isLoggedIn, function(req, res) {
    //lookup Vair using ID
    Vair.findById(req.params.id, function(err, vair) {
        if (err) {
            console.log(err);
            res.redirect("/vair");
        } else {
            Ikainis.create(req.body.vairik, function(err, vairik) {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    vairik.author.id = req.user._id;
                    vairik.author.username = req.user.username;
                    //save ikainis
                    vairik.save();
                    vair.ikainis.push(vairik);
                    vair.save();
                    console.log(vairik);
                    req.flash('success', 'Sukurtas naujas ikainis!');
                    res.redirect('/vair/' + vair._id);
                }
            });
        }
    });
});

//  Edit IKAINIS
router.get("/:ikainisId/edit", middleware.isLoggedIn, function(req, res) {
    // find vairuotojas by id
    Ikainis.findById(req.params.ikainisId, function(err, ikainis) {
        if (err) {
            console.log(err);
        } else {
            Data.find({
                doc: "darbrus"
            }, function(err, darbrus) {
                if (!err) {
                    console.log('found darbrus');
                }
                res.render("vairik/edit", {
                    vairid: req.params.id,
                    ikainis: ikainis,
                    darbrus: darbrus
                });
            });
        }
    })
});
//  UPDATE Edited ikainis
router.put("/:ikainisId", function(req, res) {
    Ikainis.findByIdAndUpdate(req.params.ikainisId, req.body.vairik, function(err, ikainis) {
        if (err) {
            res.render("edit");
        } else {
            res.redirect('/vair/' + req.body.vairik.vairid);
        }
    });
});
//  DELETE Ikainis
router.delete("/:ikainisId", middleware.isLoggedIn, function(req, res) {
    Ikainis.findByIdAndRemove(req.params.ikainisId, function(err) {
        if (err) {
            console.log("PROBLEM!");
        } else {
            res.redirect("/vair/" + req.params.id);
        }
    })
});


module.exports = router;