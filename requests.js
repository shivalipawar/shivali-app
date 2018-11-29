var request = require('superagent');
var token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzcEBldG4uY29tIiwiaXNzIjoiVyBXIiwiZXhwIjoxNTQzNDkwNTU0fQ.Ku-0yzCiZk9MlIenREkH3AEWY2wAPZelsRPyfh5r3AndaK4alMXJSgpHpHyZxlXHGZy7WJoI05mLr9pvxHD8QA';

const login = (response, username = "", password = "") => {
  new Promise((resolve, reject) => {
    request
      .put('https://www.eatonsecureconnect.com/m2m-eaton-web/rest/mobileUser/jwt/login')
      .send({
        "login": username,
        "password": password
      })
      .set('Content-Type', 'application/json')
      .set('applicationId', 'a10a93111cc44bb4')
      .end((err, res) => {
        if (res) {
          console.log("Response " + res.text + " Error" + err)
          console.log(res.code)
          resolve(res.text)
        }
      });
  }).then((token) => {
    console.log("Token.........", token)
    response.send(token)
  });
};

const pair = (response) => {
  new Promise((resolve, reject) => {
    request
      .get('https://www.eatonsecureconnect.com/m2m-eaton-web/rest/pair/all')
      .set('applicationId', 'a10a93111cc44bb4')
      .set('jwt', token)
      .end((err, res) => {
        console.log("Response code : ", res.status)
        if (res.code == 200) {
          console.log("Response " + res.text + " Error" + err)
          console.log(res.code)
          response.send({
            'fulfillmentText': 'panel paired successfully'
          })
        } else {
          console.log("Response" + res);
          console.log("Error" + err);
          response.send({
            'fulfillmentText': 'failed to pair'
          })
        }
      });
  }).then((t) => {
    console.log("Token.........", t);
    response.send(token)
    //response.json({'fulfillmentText':token});
  }).catch((err) => {
    //response.json({'fulfillmentText':"Unable to get the status of the panel"});
    console.log("Error after resolving" + err);
  });
}

const setPanel = (response) => {
  new Promise((resolve, reject) => {
    request
      .put('https://www.eatonsecureconnect.com/m2m-eaton-web/async/system/partitions-1/')
      .send({
        "state": "fullset" //unset,set.
      })
      .set('cache-control', 'no-cache')
      .set('client-token', 'o5Hd2smYzC10UrPPspyY9jKx0VMz5OgQ9')
      .set('Content-Type', 'application/json')
      .set('jwt', token)
      .end((err, res) => {
        console.log("Response code : ", res.status)
        if (res.status == 200) {
          console.log("Response " + res.text + " Error" + err)
          console.log(res.code)
          obj = JSON.parse(res.text);
          response.send({
            'fulfillmentText': 'panel set successfully to '+obj.state
          })
        } else {
          console.log("Response" + res);
          console.log("Error" + err);
          response.send({
            'fulfillmentText': 'failed to set panel'
          })
        }
      });
  }).then((token) => {
    console.log("Token.........", token)
    response.send(token)
    //response.json({'fulfillmentText':token});
  }).catch((err) => {
    //response.json({'fulfillmentText':"Unable to get the status of the panel"});
    console.log("Error after resolving" + err);
  });
};

const unsetPanel = (response) => {
  new Promise((resolve, reject) => {
    request
      .put('https://www.eatonsecureconnect.com/m2m-eaton-web/async/system/partitions-1/')
      .send({
        "state": "unset"
      })
      .set('cache-control', 'no-cache')
      .set('client-token', 'o5Hd2smYzC10UrPPspyY9jKx0VMz5OgQ9')
      .set('Content-Type', 'application/json')
      .set('jwt', token)
      .end((err, res) => {
        console.log("Response code : ", res.status)
        if (res.status == 200) {
          console.log("Response " + res.text + " Error" + err)
          console.log(res.code)
          obj = JSON.parse(res.text);
          response.send({
            'fulfillmentText': 'panel state is '+obj.state
          })
        } else {
          console.log("Response" + res);
          console.log("Error" + err);
          response.send({
            'fulfillmentText': 'failed to unset panel'
          })
        }
      });
  }).then((token) => {
    console.log("Token.........", token)
    response.send(token)
    //response.json({'fulfillmentText':token});
  }).catch((err) => {
    //response.json({'fulfillmentText':"Unable to get the status of the panel"});
    console.log("Error after resolving" + err);
  });
};

const getPanelState = (response) => {
  new Promise((resolve, reject) => {
    request
      .get('https://www.eatonsecureconnect.com/m2m-eaton-web/async/system/partitions-1/')
      .set('cache-control', 'no-cache')
      .set('client-token', 'o5Hd2smYzC10UrPPspyY9jKx0VMz5OgQ9')
      .set('Content-Type', 'application/json')
      .set('jwt', token)
      .end((err, res) => {
        console.log("Response code is : ", res.status)
        if (res.status == 200) {
          console.log("Response " + res.text + " Error :" + err)
          obj=JSON.parse(res.text);
          //resolve(res.text)
          response.send({'fulfillmentText': "current state of panel is "+obj.state});
        } else {
          console.log("Response" + JSON.parse(res));
          console.log("Error :" + err);
          response.send({'fulfillmentText': " could not get panel state"});
          //reject(res)
        }
      });
  }).then((token) => {
    console.log("Token.........", token)
   //response.send({'fulfillmentText': "panel state is fullset"});
  }).catch((err) => {
    //response.send({'fulfillmentText': " could not get panel state"});
    console.log("Error after resolving" + JSON.stringify(err));
  });
}

const defaultFunc = (response) => {
  response.send({
    'fulfillmentText': 'could not get you , please repeate again'
  })
}


module.exports = {
  getPanelState: getPanelState,
  setPanel: setPanel,
  unsetPanel: unsetPanel,
  pair: pair,
  login: login,
  defaultFunc: defaultFunc
};