const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public")); //path of static files
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});



// // Post requests
app.post("/", function(req, res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;



  var data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/3d74f50b46",
    method: "POST",
    headers: {
      "Authorization": "mark1 466720310a82b9b291b0844b4833e0d7-us20"
    },
    body: jsonData
  };

  // console.log(firstName, lastName, email);
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
    }
    }

  });

// redirects to home route after failure
  app.post("/failure", function(req, res) {
res.redirect("/");
});

});

app.listen(process.env.PORT || 3000, function() {
  console.log("server starter on port ");
});

// // API key
// // 466720310a82b9b291b0844b4833e0d7-us20
// Audience ID: 3d74f50b46.
