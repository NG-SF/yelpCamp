const express = require('express');
const app = express();

app.set('view engine', "ejs");

app.get('/', function(req, res) {
  res.render("landing");
});

app.get("/capmgrounds", function(req, res) {
   let capmgrounds = [
       {name: "Creek", image: ""},
       {name: "River camp", image: ""},
       {name: "Mountain capm", image: ""}
   ];
});


app.listen(process.env.PORT || 3000, function() {
    console.log('The YelpCamp server has started!')
});