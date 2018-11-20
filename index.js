var request = require('./requests')
var bodyParser = require('body-parser');
var express = require('express')
var app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

var matchRoute = (query) => {
  if (query.indexOf("login") != -1 || query.indexOf("sign in") != -1) {
    return request.login
  }
  if (query.indexOf("unset panel") !=-1  || query.indexOf("unset panel state")!= -1) {
    return request.unsetPanel
  }
  if (query.indexOf("set panel") != -1 || query.indexOf("set panel state") != -1 || query.indexOf("set state of panel") != -1) {
    return request.setPanel
  }
  if (query.indexOf("get panel") != -1 || query.indexOf("get panel state") != -1 || query.indexOf("get state of panel") != -1) {
    return request.getPanelState
  }
  if (query.indexOf("get paired panel") != -1 || query.indexOf("paired panel") != -1 || query.indexOf("get all panels") != -1 || query.indexOf("get list of panel") != -1) {
    return request.pair
  }
  return request.defaultFunc
};

app.post('/', function (request, response) {
  console.log("Request entire body: " + JSON.stringify(request.body))
  response.send({
    'fulfillmentText': 'Welcome to hello world of eaton.'
  });
});

app.post('/echo', function (request, response) {
  console.log("Request entire body: " + JSON.stringify(request.body))
  apiMethod = matchRoute(request.body.queryResult.queryText)
  apiMethod(response)
});

app.post('/login', function (request, response) {
  requests.login(response, "", "");
});
app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
});