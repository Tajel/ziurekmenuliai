var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Auto = require("../models/auto");
var Data = require("../models/darbrus");
var Ikainis = require("../models/autoik");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
    // find campground by id
    // console.log(req.params.id);
    Auto.findById(req.params.id, function(err, auto) {
        if (!err) {
            console.log('found auto');
        }
        Data.find({
            doc: "darbrus"
        }, function(err, darbrus) {
            if (!err) {
                console.log('faound darbrus');
            }
            res.render("autoik/new", {
                auto: auto,
                darbrus: darbrus
            });
        });
    });
});

//Ikainis Create
router.post("/", middleware.isLoggedIn, function(req, res) {
    //lookup auto using ID
    Auto.findById(req.params.id, function(err, auto) {
        if (err) {
            console.log(err);
            res.redirect("/autokrov");
        } else {
            Ikainis.create(req.body.autoik, function(err, autoik) {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    autoik.author.id = req.user._id;
                    autoik.author.username = req.user.username;
                    //save comment
                    autoik.save();
                    auto.ikainis.push(autoik);
                    auto.save();
                    console.log(autoik);
                    req.flash('success', 'Sukurtas naujas ikainis!');
                    res.redirect('/autokrov/' + auto._id);
                }
            });
        }
    });
});

//  Edit IKAINIS
router.get("/:ikainisId/edit", middleware.checkOwnership, function(req, res) {
    // find campground by id
    Ikainis.findById(req.params.ikainisId, function(err, ikainis) {
        if (err) {
            console.log(err);
        } else {
            Data.find({
                doc: "darbrus"
            }, function(err, darbrus) {
                if (!err) {
                    console.log('faound darbrus');
                }
                res.render("autoik/edit", {
                    autoid: req.params.id,
                    ikainis: ikainis,
                    darbrus: darbrus
                });
            });
        }
    })
});
//  UPDATE Edited ikainis
router.put("/:ikainisId", function(req, res) {
    Ikainis.findByIdAndUpdate(req.params.ikainisId, req.body.autoik, function(err, ikainis) {
        if (err) {
            res.render("edit");
        } else {
            res.redirect('/autokrov/' + req.body.autoik.autoid);
        }
    });
});
//  DELETE Ikainis
router.delete("/:ikainisId", middleware.isLoggedIn, function(req, res) {
    Ikainis.findByIdAndRemove(req.params.ikainisId, function(err) {
        if (err) {
            console.log("PROBLEM!");
        } else {
            res.redirect("/autokrov/" + req.params.id);
        }
    })
});


module.exports = router;