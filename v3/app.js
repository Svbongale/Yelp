console.log("This is the yelpcamp V2");
// Import express package
var express=require("express");
var app=express();
var passport=require("passport");
var LocalStrategy=require("passport-local");
// Import campground models
var Campground = require("./models/campground");
var Comments = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");
seedDB();
// Body parser
var bodyparser= require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
// Connect mongoose to express
var mongoose=require("mongoose");

// connect mongoose
mongoose.connect("mongodb://localhost/Yelp_camp",{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false });


// Passport Configuration
app.use(require("express-session")({
	secret : "Once again",
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
	next();
});

// routes
app.get("/",function(req,res){
	res.render("landing.ejs");
});

// Campgrounds Route
app.get("/campgrounds",function(req,res){
	console.log(req.user);
	// Get all campgrounds from the database
	Campground.find({},function(err,allCampground){
		if(err){
			console.log(err);
			console.log("Somthing went wrong");
		}else{
			console.log("Campgrounds are:");
			res.render("campgrounds/index.ejs",{campgrounds:allCampground, currentUser: req.user});
		}
	});	 
});

// add new campgrounds
app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new.ejs");
});


// Show page
// Shows the descriptions about the campground
app.get("/campgrounds/:id",function(req,res){
	// capture the id
	// mongoose method
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log("Found campgrounds");
			res.render("campgrounds/show.ejs",{campground:foundCampground});
		}
	});	
});

// Post  routes
app.post("/campgrounds",function(req,res){
// 	get data from the form and add it to the campgrounds page
	
	var name=req.body.name;
	var image=req.body.image;
	var desc= req.body.description;
	var newCampGround={name:name,image:image,description:desc};
	
	// save it to the database
	Campground.create(newCampGround,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			// rediect to the same page by updating the data
			res.redirect("/campgrounds");
		}
	})
});


// ****************************Comments routes****************

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new.ejs",{campground:campground});
		}
	})
});



app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
		// lookup campground using id
		Campground.findById(req.params.id,function(err,campground){
			if(err){
				console.log(err);
				res.redirect("/campgrounds")
			}else{
				Comments.create(req.body.comment,function(err,comment){
					if(err){console.log(err);
					}else{
						campground.comments.push(comment);
						campground.save();
						res.redirect("/campgrounds/" + campground._id);
					}
				})
			}
		})
});




// **********************************AUTH routes**********************

// Show register format

app.get("/register",function(req,res){
	res.render("register.ejs");
});


// Handel signup logic


app.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		});
	});
});


// Login routes

app.get("/login",function(req,res){
	res.render("login.ejs");
});


// Using middle ware **************IMPORTANT*************
app.post("/login",passport.authenticate("local", {
		successRedirect:"/campgrounds",
		failureRedirect:"/login"
}),function(req,res){
});

// Logout routes


app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});


// middleware

function isLoggedIn(req, res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

// App listner
app.listen(4000, function() { 
console.log("yelpcamp server has started");	
console.log('Server listening on port 4000'); 
});