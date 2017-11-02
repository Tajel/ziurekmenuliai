var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

//root route
router.get("/", middleware.isLoggedIn, function(req, res) {
    res.render("landing");
});

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar
    });
    if (req.body.adminCode === 'secretadmincode1234') {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", " Transporto valdymo modulis sveikina Jus " + user.username);
            res.redirect("/");
        });
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {});

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

    //USER PROFILE
    router.get("/users/:id", function(req, res){
        User.findById(req.params.id, function(err, foundUser){
            if(err){
                req.flash("error", "Somthiing went wrong !")
                res.redirect("/")
            } else {
                res.render("users/show", {user:foundUser})
            }
        })
    })

module.exports = router;