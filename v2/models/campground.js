var mongoose=require('mongoose');


// Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [{ 
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

// Create Model
var Campground = mongoose.model("Campgrounds",campgroundSchema);
module.exports = Campground;
