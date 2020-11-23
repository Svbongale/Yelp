var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
    {
        name: "Star Trek",
        image: "https://images.unsplash.com/photo-1525856897812-33d00556e714?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Praesent elementum facilisis leo vel. A erat nam at lectus urna duis. Nec ullamcorper sit amet risus nullam eget felis eget. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Sem nulla pharetra diam sit amet nisl. Sit amet nisl purus in mollis. Aliquet nec ullamcorper sit amet risus. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. Suspendisse sed nisi lacus sed viverra tellus in. In mollis nunc sed id. Nisl purus in mollis nunc sed id semper risus in. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Fringilla ut morbi tincidunt augue interdum velit"
    },
    {
        name: "Sa-hara",
        image: "https://images.unsplash.com/photo-1523044214787-9caaa5ee4d8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Praesent elementum facilisis leo vel. A erat nam at lectus urna duis. Nec ullamcorper sit amet risus nullam eget felis eget. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Sem nulla pharetra diam sit amet nisl. Sit amet nisl purus in mollis. Aliquet nec ullamcorper sit amet risus. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. Suspendisse sed nisi lacus sed viverra tellus in. In mollis nunc sed id. Nisl purus in mollis nunc sed id semper risus in. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Fringilla ut morbi tincidunt augue interdum velit"
    },
    {
        name: "Rev-Up",
        image: "https://images.unsplash.com/photo-1501389446297-06c4c50b5ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Praesent elementum facilisis leo vel. A erat nam at lectus urna duis. Nec ullamcorper sit amet risus nullam eget felis eget. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Sem nulla pharetra diam sit amet nisl. Sit amet nisl purus in mollis. Aliquet nec ullamcorper sit amet risus. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. Suspendisse sed nisi lacus sed viverra tellus in. In mollis nunc sed id. Nisl purus in mollis nunc sed id semper risus in. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Fringilla ut morbi tincidunt augue interdum velit"
    }

]

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("Removed campgrounds");
//         //Add a few new campgrounds
//         data.forEach(function(seed){
//             Campground.create(seed, function(err, campground){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log("Added a new campground");
//                     //Add a comment
//                     Comment.create({
//                         text: "This place is great, but no internet",
//                         author: "Homer"
//                     }, function(err, comment){
//                         if(err){
//                             console.log(err);
//                         }
//                         else{
//                             campground.comments.push(comment);
//                             campground.save();
//                             console.log("Created a new comment");
//                         }
//                     });
//                 }
//             });
//         });
     });
 }

module.exports = seedDB;