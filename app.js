const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let campgrounds = [
    {name: "Creek camp", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
    {name: "River camp", image: "https://farm9.staticflickr.com/8577/16263386718_c019b13f77.jpg"},
    {name: "Mountain camp", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs");

app.get('/', function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
   res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
//get data from form and add to campgrounds array
let name = req.body.name;
let image = req.body.image;
let newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
//redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT || 3000, function() {
    console.log('The YelpCamp server has started!')
});