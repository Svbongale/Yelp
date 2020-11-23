var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    middleware  = require("../middleware"),
    Campground  = require("../models/campground");

router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("Error.........");
        }
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

router.post("/", middleware.isLoggedIn,function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: description, author: author};
    //Create a new campground and save it into the DB
    Campground.create(newCampground, function(err, newlyAdded){
        if(err){
            req.flash("error", "Something went wrong");
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res){
    //find the campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            //render show template for that selected campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//update
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success", "Update Successful");
            res.redirect("/campgrounds/" + updatedCampground._id);
        }
    });
});

//destroy
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground){
        if(err){
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds/", + campground._id);
        }
        else{
            req.flash("success", "Deleted Successfully");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;