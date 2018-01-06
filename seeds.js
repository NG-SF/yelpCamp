const mongoose = require("mongoose"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment");

mongoose.Promise = global.Promise;

let data = [{
  name: "Mountain camp",
  image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",
  description: "This is a beautiful campground, with magnificent views of mountains, great facilities, huge parking lot. Come and experience nature at its best."
},
{
  name: "Lone grove",
  image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
  description: "This is a beautiful campground, with magnificent views of mountains, great facilities, huge parking lot. Come and experience nature at its best."
},
{
  name: "Valley camp",
  image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
  description: "This is a beautiful campground, with magnificent views of mountains, great facilities, huge parking lot. Come and experience nature at its best."
}];

function seedDB() {
  //Remove all campgrounds
    Campground.remove({}, function(err){
      if (err) {
        console.log(err);
        } 
      console.log("removed campgrounds");
  //Add campgrounds
    data.forEach(seed => {
      Campground.create(seed, function(err, campground){
      if (err) { 
        console.log(err); 
        } else { 
          console.log("added a campground"); 
          
          //   //Create  comment
          // Comment.create({
          //   text: "This is test comment!!!",
          //   author: "Snape"
          //   }, function(err, comment) {
          //     if (err) { 
          //       console.log(err);
          //       } else {
          //         campground.comments.push(comment);
          //         campground.save(function(err, camp){
          //           if (err) {console.log(err);}
          //           else {console.log(camp);}
          //         });
          //         console.log("created new comment");
          //       }
          //   });
          }
    });  
    });
});
}

module.exports = seedDB;
