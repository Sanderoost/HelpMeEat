"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/imdb", function(req, res) {
    let title = req.body.result.parameters.AudioSample.toLowerCase();
    let api = "http://www.omdbapi.com/?t=" + title + "&apikey=fa194e9c";
    var speech = "";
      axios.get(api)
       .then(function(response) { 
            speech = response.data.Title;

              return res.json({
              speech: speech,
              displayText: speech,
              source: "webhook-echo-sample"
            });
          function done(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/");
            }
          }
        })
      .catch(data => {
        console.log(error.response.data);
      });

});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});