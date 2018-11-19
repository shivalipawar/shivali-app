// import {login, getState, pair, setState} from './requests'
var requests = require('./requests')
var bodyParser = require('body-parser');
var express = require('express')
var app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.post('/pair', function (request, response) {
  requests.pair(response)
})
app.post('/setstate', function (request, response) {
  requests.setState(response)
})

app.post('/getstate', function (request, response) {
  requests.getState(response)
})

app.post('/', function (request, response) {
  // console.log("Request body : " + request.body.queryResult.queryText)
  console.log("Request entire body: " + JSON.stringify(request.body))
  response.send({
    'fulfillmentText': 'Welcome to hello world of eaton.'
  });
});

app.post('/login', function (request, response) {
  requests.login(response, "", "");
});
app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
});