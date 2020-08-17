console.log("This is the yelpcamp V1");
var express=require("express");
var app=express();
// Body parser

var bodyparser= require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));

// global array
var campgrounds=[{name:"Mt.Everest", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRll4CEggmY9YZgUIJ3nDdytJ-vuca46l-u5w&usqp=CAU"},
					 {name:"Mt.K2", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ0PeQiMJAyU3hXbBY2_IGhQnShR7m2aNVsDQ&usqp=CAU"},
					 {name:"WesternGhats", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9zwXhEKDZ1wqhsGHpURLVbBXUgd-NjSb0Jw&usqp=CAU"},
				 {name:"Mt.Everest", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRll4CEggmY9YZgUIJ3nDdytJ-vuca46l-u5w&usqp=CAU"},
					 {name:"Mt.K2", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ0PeQiMJAyU3hXbBY2_IGhQnShR7m2aNVsDQ&usqp=CAU"},
					 {name:"WesternGhats", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9zwXhEKDZ1wqhsGHpURLVbBXUgd-NjSb0Jw&usqp=CAU"}
					
					];//array of objects ends here!
// declared as global because of scoping issue.

// routes
app.get("/",function(req,res){
	
	res.render("landing.ejs");
});


// Camp grounds Route
app.get("/campgrounds",function(req,res){
	res.render("campgrounds.ejs",{campgrounds:campgrounds});
});

// add new campgrounds
app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});

// Post  routes
app.post("/campgrounds",function(req,res){
// 	get data from the form and add it to the campgrounds array
	
	var name=req.body.name;
	var image=req.body.image;
	var newCampGround={name:name,image:image};
	campgrounds.push(newCampGround);
	// res.send("This is the post route");
// rediect to the same page by updating the data
	res.redirect("/campgrounds");
});

// App listner

app.listen(3000, function() { 
console.log("yelpcamp server has started");	
console.log('Server listening on port 3000'); 
});