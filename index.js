"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const restService = express();
let search = "";

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/", function(req, res) {
    search = req.body.queryResult.parameters['any'];
    request('https://www.food2fork.com/api/search?key=2951d8b72aa7ba4dcb402ebbe0c04791&q=' + search , function (error, response, body) {
      let obj = JSON.parse(body);
      let responseObj;
      if(obj.count < 1)
      {
        responseObj={
            "speech": "I could not find any recipes with that ingredient."
            ,"displayText": "I could not find any recipes with that ingredient."
            ,"fulfillmentText" : "I could not find any recipes with that ingredient."
            ,"source": "helpmeeat"
        }
      }
      else
      {
        let rand = obj.recipes[Math.floor(Math.random() * obj.recipes.length)];
        responseObj={
            "speech": rand.title
            ,"displayText": rand.title
            ,"fulfillmentText" : "How about " + rand.title + "?"
            ,"source": "helpmeeat"
            }

      }
      res.send(responseObj);
    });
});




restService.listen(8000, function() {
  console.log("Server up and listening");
});