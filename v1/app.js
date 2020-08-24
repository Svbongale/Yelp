console.log("This is the yelpcamp V1");
// Import express package
var express=require("express");
var app=express();

// Body parser
var bodyparser= require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

// Connect mongoose to express
var mongoose=require("mongoose");

// connect mongoose
mongoose.connect("mongodb://localhost/Yelp_camp",{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false });

// Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

// Create Model
var Campground = mongoose.model("Campgrounds",campgroundSchema);
// Create a campground by default
Campground.create({
	name: "Seege Gudda",
	image: "",
	description: "This is the huge granite hill with lorem40"
},function(err,Campground){
	if(err){
		console.log(err);
		console.log("Error...Could not add campground!");
	}else{
		console.log("Added the campground");
		console.log(Campground);
	}
});

// routes
app.get("/",function(req,res){
	
	res.render("landing.ejs");
});


// Index route
// Campgrounds Route
app.get("/campgrounds",function(req,res){
	// Get all campgrounds from the database
	Campground.find({},function(err,allCampground){
		if(err){
			console.log(err);
			console.log("Somthing went wrong");
		}else{
			console.log("Campgrounds are:");
			res.render("campgrounds.ejs",{campgrounds:allCampground});
		}
	});
	 
});


//New route
// add new campgrounds
app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});


// Show route
// Show information about the clicked immage/ground
app.get("/campgrounds/:id",function(req,res){
	res.send("This is the id page.");
});


// Create route
// Post  routes
app.post("/campgrounds",function(req,res){
// 	get data from the form and add it to the campgrounds array
	
	var name=req.body.name;
	var image=req.body.image;
	var newCampGround={name:name,image:image};
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




// App listner
app.listen(4000, function() { 
console.log("yelpcamp server has started");	
console.log('Server listening on port 3000'); 
});