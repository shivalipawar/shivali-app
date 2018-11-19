var express = require('express')
var request = require('superagent');
var app = express()

function myReq(response) {
  new Promise((resolve, reject) => {
    request
      .put('https://www.eatonsecureconnect.com/m2m-eaton-web/rest/mobileUser/jwt/login')
      .send({
        "login": "Some-username",
        "password": "some-password"
      })
      .set('Content-Type', 'application/json')
      .set('applicationId', 'a10a93111cc44bb4')
      .end((err, res) => {
        console.log("Response " + res.text + " Error" + err)
        console.log(res.code)
        resolve(res.text)
      });
  }).then((token) => {
    console.log("Token.........",token)
    response.send(token)
  });
}
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.get('/', function (request, response) {
  response.send('Hello World!')
})
app.get('/echo', function (request, response) {
  token = myReq(response)
  // response.send("token")
})

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
})