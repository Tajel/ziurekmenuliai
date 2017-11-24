var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    expressSanitizer = require("express-sanitizer");
//requiring routes
var
    autokrovRoutes = require("./routes/autokrov"),
    autolenRoutes = require("./routes/autolen"),
    automechRoutes = require("./routes/automech"),
    autommRoutes = require("./routes/automm"),
    autonuomaRoutes = require("./routes/autonuoma"),
    autoikRoutes = require("./routes/autoik"),
    vairRoutes = require("./routes/vair"),
    vairikRoutes = require("./routes/vairik"),
    dvRoutes = require("./routes/dv"),
    objRoutes = require("./routes/obj"),
    padRoutes = require("./routes/pad"),
    trrusRoutes = require("./routes/trrus"),
    trtipRoutes = require("./routes/trtip"),
    kurrusRoutes = require("./routes/kurrus"),
    darbrusRoutes = require("./routes/darbrus"),
    kuruzpRoutes = require("./routes/kuruzp"),
    imonesRoutes = require("./routes/imones"),
    kellapRoutes = require("./routes/kellap"),
    kellapajamosRoutes = require("./routes/kellapajamos"),
    kellapkurasRoutes = require("./routes/kellapkuras"),
    kellapvairRoutes = require("./routes/kellapvair"),
    testRoutes = require("./routes/test"),
    indexRoutes = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/transport2";
mongoose.connect(url, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
    extended: true
}));
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

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/test", testRoutes);
app.use("/obj", objRoutes);
app.use("/dv", dvRoutes);
app.use("/vair", vairRoutes);
app.use("/vair/:id/vairik", vairikRoutes);
app.use("/pad", padRoutes);
app.use("/trrus", trrusRoutes);
app.use("/trtip", trtipRoutes);
app.use("/kurrus", kurrusRoutes);
app.use("/darbrus", darbrusRoutes);
app.use("/kuruzp", kuruzpRoutes);
app.use("/imones", imonesRoutes);
app.use("/autokrov", autokrovRoutes);
app.use("/autokrov/:id/autoik", autoikRoutes);
app.use("/autokrov/:id/kellap", kellapRoutes);
app.use("/autolen", autolenRoutes);
app.use("/automech", automechRoutes);
app.use("/automm", autommRoutes);
app.use("/autonuoma", autonuomaRoutes);
app.use("/kellap", kellapRoutes);
app.use("/kellap/:id/paj", kellapajamosRoutes);
app.use("/kellap/:id/kur", kellapkurasRoutes);
app.use("/kellap/:id/vair", kellapvairRoutes);

// app.get('/', function (req, res) {
//   // each request has its own id
//   // so you can track the log of each request
//   // by using `req.log`
//   // the ids are cycled every 2^31 - 2
//   req.log.info('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
//   res.send('@@@@ LOG @@@@@')
// })


// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("TRANSPORT Server Has Started!");

app.listen(3000, "127.0.0.1", function () {
    console.log("TRANSOPORTO MODULIS server started port:3000");
});