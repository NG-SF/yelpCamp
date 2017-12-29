const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

//schema setup
let camproundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", camproundSchema);

// Campground.create({
//     name: "Mountain camp",
//     image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",
//     description: "This is a beautiful campground, with magnificent views of mountains, great facilities, huge parking lot. Come and experience nature at its best."
// }, function (err, camp) {
//     if (err) {
//         console.log("error happened", err);
//     } else {
//         console.log("camp added", camp);
//     }
// });

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', "ejs");

app.get('/', function (req, res) {
    res.render("landing");
});

//get all campgrounds from the DB
app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, camps) {
        if (err) {
            console.log("error happened", err);
        } else {
            console.log("Here are all the Campground");
            res.render("index", { Campground: camps });
        }
    });
});

app.post("/campgrounds", function (req, res) {
    //get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {
        name: name,
        image: image,
        description: description
    };
    // create a new campground and save to DB
    Campground.create(newCampground, function (err, newCamp) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err) { console.log(err); }
        else { //render show template with that campground
        res.render("show", { Campground: foundCamp });
        }
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('The YelpCamp server has started!')
});