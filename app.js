const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

const today = new Date();
let options = {
  month: 'long',
  day: 'numeric',
  year:'numeric'
}

const currentDay = today.toLocaleDateString("en-US", options);

const personal = ["Get Up","Meditate"];
const work = ["Check Emails","Check Github"];
const miscellaneous = ["Do some DIY", "Paint"];

app.get("/", function(req,res){
  res.render("home");
});

app.post("/", function(req, res) {
  if (req.body.personalList == "Personal List") {
    res.redirect("/personal");
  } else if (req.body.workList == "Work List") {
    res.redirect("/work");
  } else if (req.body.miscellaneousList == "Miscellaneous List") {
    res.redirect("/miscellaneous");
  } else {
    res.redirect("/");
  }
});

app.get("/personal", function(req, res){
  res.render("personal", {
    personalItems: personal,
    today: currentDay,
  });
})


app.post("/personal", function(req,res){
  const item = req.body.newTask;
  personal.push(item);

  res.redirect("/personal");
});

app.get("/work", function(req, res){
  res.render("work", {
    workItems: work,
    today: currentDay,
  });
})


app.post("/work", function(req,res){
  const item = req.body.newTask;
  work.push(item);

  res.redirect("/work");
});


app.get("/miscellaneous", function(req, res){
  res.render("miscellaneous", {
    miscellaneousItems: miscellaneous,
    today: currentDay,
  });
})


app.post("/miscellaneous", function(req,res){
  const item = req.body.newTask;
  miscellaneous.push(item);

  res.redirect("/miscellaneous");
});


app.listen(3000, function() {
  console.log("This server is running on port number 3000.");
});
