var request = require('superagent');
var token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzcEBldG4uY29tIiwiaXNzIjoiVyBXIiwiZXhwIjoxNTQyNjQ0Mjg2fQ.HJZ7RWaUt4VYWidStMfeSxPr2wvDicjgL1Qj_jUxCStnKetszijYZWFOj6gYN9yN4Z7Nu8Eccl0wQ9nK5Yw6xQ';
var login = function (response, username, password) {
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
}

function pair(response) {
  new Promise((resolve, reject) => {
    request
      .get('https://www.eatonsecureconnect.com/m2m-eaton-web/rest/mobileUser/pair/all')
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
    console.log("Token.........", t)
    response.send(token)
    //response.json({'fulfillmentText':token});
  }).catch((err) => {
    //response.json({'fulfillmentText':"Unable to get the status of the panel"});
    console.log("Error after resolving" + err);
  });
}

function setPanel(response) {
  new Promise((resolve, reject) => {
    request
      .put('https://www.eatonsecureconnect.com/m2m-eaton-web/async/system/partitions-1/')
      .send({
        "state": "fullset" //unset,set.
      })
      .set('cache-control', 'no-cache')
      .set('client-token', 'cx8CudMWS7fw6QgcBRP8yjKFFOtWez0H4')
      .set('Content-Type', 'application/json')
      .set('jwt', token)
      .end((err, res) => {
        console.log("Response code : ", res.status)
        if (res.status == 200) {
          console.log("Response " + res.text + " Error" + err)
          console.log(res.code)
          response.send({
            'fulfillmentText': 'panel paired successfully'
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
}

function getPanelState(response) {
  new Promise((resolve, reject) => {
    request
      .get('https://www.eatonsecureconnect.com/m2m-eaton-web/async/system/partitions-1/')
      .set('cache-control', 'no-cache')
      .set('client-token', 'cx8CudMWS7fw6QgcBRP8yjKFFOtWez0H4')
      .set('Content-Type', 'application/json')
      .set('jwt', token)
      .end((err, res) => {
        if (res.code == 200) {
          console.log("Response " + res.text + " Error" + err)
          console.log(res.code)
          resolve(res.text)
        } else {
          console.log("Response" + res);
          console.log("Error" + err);
          reject(res)
        }
      });
  }).then((token) => {
    console.log("Token.........", token)
    response.send({'fulfillmentText': "panel state is fullset"});
  }).catch((err) => {
    response.send({'fulfillmentText': " could not get panel state"});
    console.log("Error after resolving" + err);
  });
}

module.exports = {
  getState: getPanelState,
  setState: setPanel,
  pair: pair,
  login: login
};