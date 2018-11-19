var express = require('express')
var request = require('superagent');
var request1 = require('superagent');
var app = express()
var jwttoken;

function myReq(response) {
  new Promise((resolve, reject) => {
    request
      .put('https://www.eatonsecureconnect.com/m2m-eaton-web/rest/mobileUser/jwt/login')
      .send({
        "login": "",
        "password": ""
      })
      .set('Content-Type', 'application/json')
      .set('applicationId', 'a10a93111cc44bb4')
      .end((err, res) => {
        if(res){
          console.log("Response " + res.text + " Error" + err)
          console.log(res.code)
          resolve(res.text)
        } 
      });
  }).then((token) => {
    console.log("Token.........",token)
    response.send(token)
  });
}

function myStat(response) {
  new Promise((resolve, reject) => {
    request
      .get('https://www.eatonsecureconnect.com/m2m-eaton-web/rest/mobileUser/pair/all')
      .set('applicationId', 'a10a93111cc44bb4')
      .set('jwt', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzcEBldG4uY29tIiwiaXNzIjoiVyBXIiwiZXhwIjoxNTQyNjE2NzA4fQ.nrEtxheYjfUb-OzYSMlNVW3yXKLJCxOmVaASlNKfIuSKPCCFcwFsoZAPCgbfcCEpBrpW_ujvwJXvHbYKSc4fZw')
      .end((err, res) => {
        if(res){
          console.log("Response " + res.text + " Error" + err)
          console.log(res.code)
          resolve(res.text)
        } 
        else{
          console.log("Response" +res);
          console.log("Error" +err);
        }
      });
  }).then((token) => {
    console.log("Token.........",token)
    response.send(token)
    response.json({'fulfillmentText':token});
  }).catch((err) =>{
    response.json({'fulfillmentText':"Unable to get the status of the panel"});
    console.log("Error after resolving"+err);
  });
}
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.get('/', function (request, response) {
  response.send('Hello World!')
})
app.post('/', function (request, response) {
  // response.send({ 'fulfillmentText':'Hello World!'})
   response.send({ 'fulfillmentText': 'Welcome to hello world of eaton.' });
 })
// app.get('/echo', function (request, response) {
//   token = myReq(response)
//   // response.send("token")
// })

app.post('/echo', function (request, response) {
  token = myReq(response);
  response.send({ 'fulfillmentText': token });
 })

app.get('/stat', function (request, response) {
  token = myStat(response)
})

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
})