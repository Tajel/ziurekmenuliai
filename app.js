var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User        = require("./models/user");
    
//requiring routes
var 
    autokrovRoutes      = require("./routes/autokrov"),
    autolenRoutes       = require("./routes/autolen"),
    automechRoutes      = require("./routes/automech"),
    autonuomaRoutes      = require("./routes/autonuoma"),
    vairRoutes            = require("./routes/vair"),
    dvRoutes            = require("./routes/dv"),
    objRoutes           = require("./routes/obj"),
    padRoutes           = require("./routes/pad"),
    trrusRoutes         = require("./routes/trrus"),
    trtipRoutes         = require("./routes/trtip"),
    kurrusRoutes        = require("./routes/kurrus"),
    kuruzpRoutes        = require("./routes/kuruzp"),
    imonesRoutes        = require("./routes/imones"),
    kellapRoutes        = require("./routes/kellap"),
    indexRoutes         = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/transport2";
mongoose.connect(url);
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/obj", objRoutes);
app.use("/dv", dvRoutes);
app.use("/vair", vairRoutes);
app.use("/pad", padRoutes);
app.use("/trrus", trrusRoutes);
app.use("/trtip", trtipRoutes);
app.use("/kurrus", kurrusRoutes);
app.use("/kuruzp", kuruzpRoutes);
app.use("/imones", imonesRoutes);
app.use("/autokrov", autokrovRoutes);
app.use("/autolen", autolenRoutes);
app.use("/automech", automechRoutes);
app.use("/autonuoma", autonuomaRoutes);
app.use("/kellap", kellapRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("TRANSPORT Server Has Started!");
});