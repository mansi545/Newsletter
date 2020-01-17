const express = require("express");

const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;
  // console.log(firstname, lastname , email);
  // Array of objects in member fcor mailchimp
  // data is a javascript object we neww to convert into json
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }

    }]
  };
  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/9743105e38",
    method: "POST",
    headers: {
     
      },
     body: jsonData
  };
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if( response.statusCode === 200)
      {
      res.sendFile(__dirname + "/success.html");
      }
      else{
      res.sendFile(__dirname + "/failure.html");

      }
    }
  });
});
app.post("/failure",function(req,res){
  // res.sendFile(__dirname + "/signup.html");
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});
