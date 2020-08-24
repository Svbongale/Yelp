console.log("This is the yelpcamp V2");
// Import express package
var express=require("express");
var app=express();
// Import campground models
var Campground = require("./models/campground");
var Comments = require("./models/comment");
var seedDB = require("./seeds");
seedDB();
// Body parser
var bodyparser= require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

// Connect mongoose to express
var mongoose=require("mongoose");

// connect mongoose
mongoose.connect("mongodb://localhost/Yelp_camp",{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false });

// routes
app.get("/",function(req,res){
	
	res.render("landing.ejs");
});

// Campgrounds Route
app.get("/campgrounds",function(req,res){
	// Get all campgrounds from the database
	Campground.find({},function(err,allCampground){
		if(err){
			console.log(err);
			console.log("Somthing went wrong");
		}else{
			console.log("Campgrounds are:");
			res.render("campgrounds/index.ejs",{campgrounds:allCampground});
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


app.get("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new.ejs",{campground:campground});
		}
	})
	
});



app.post("/campgrounds/:id/comments",function(req,res){
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









// App listner
app.listen(4000, function() { 
console.log("yelpcamp server has started");	
console.log('Server listening on port 4000'); 
});