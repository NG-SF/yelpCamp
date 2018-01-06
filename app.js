const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', "ejs");

seedDB();

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
            res.render("campgrounds/index", { Campground: camps });
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
    res.render("campgrounds/new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err) { console.log(err); }
        else { //render show template with that campground
        res.render("campgrounds/show", { Campground: foundCamp });
        }
    });
});

//++++++++++++++++ Comments Routs +++++++++++++++

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if (err) {console.error(err);}
        else {
            res.render("comments/new", {Campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       console.log("this is id before create", campground._id, "this is comments ", campground.comments);
       if (err) {
           console.error(err);
           res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.error(err);
                } else {
                    campground.comments.push(comment);
                    campground.save(function(err, camp){
                    if (err) {console.log(err);}
                    else {console.log(camp);}
                  });
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
       }
   });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('The YelpCamp server has started!')
});