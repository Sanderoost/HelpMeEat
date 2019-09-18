"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/hoi", function(req, res) {
    let title = req.body.result.parameters.AudioSample.toLowerCase();
    title = "chicken"

    request('https://www.food2fork.com/api/search?key=63c748f9988ed0a2866e6b3db825b5ac&q=' + title , function (error, response, body) {
      let obj = JSON.parse(body);
      if(obj.count > 1){
        return "No results for " + search;
      }
      else{
        let rand = obj.recipes[Math.floor(Math.random() * obj.recipes.length)]
        let responseObj={
            "fulfillmentText": "  "
            ,"fulfillmentMessages": [{"text": {"text": [rand.title]}}]
            ,"source": " "

        }
        console.log(responseObj);
        return res.responseObj;
      }
    });
});

function returnRecipe(search){
  request('https://www.food2fork.com/api/search?key=63c748f9988ed0a2866e6b3db825b5ac&q=' + search , function (error, response, body) {
    let obj = JSON.parse(body);
    if(obj.count > 1){
      return "No results for " + search;
    }
    else{
      let rand = obj.recipes[Math.floor(Math.random() * obj.recipes.length)]
      let responseObj={
          "fulfillmentText": "  "
          ,"fulfillmentMessages": [{"text": {"text": [rand.title]}}]
          ,"source": " "

      }
      return res.responseObj;
    }
  });
}


restService.listen(8000, function() {
  console.log("Server up and listening");
    // let title = req.body.result.parameters.AudioSample.toLowerCase();
    // var search = "chicken"
    // var speech = returnRecipe(search);
    // console.log(speech)
});