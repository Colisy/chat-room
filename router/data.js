var express = require('express');
var router = express.Router();
var request = require('request');
var qs = require('querystring')
var reqapi1 = function(content) {
  return new Promise(function(resolve, reject) {
    request({
      method: "get",
      uri: 'http://api.qingyunke.com/api.php?key=free&appid=0&msg='+content,
      multipart: [{
        'content-type': 'application/json',
        body: "body"
      }]
    }, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve(res.body);
      }
    })
  })
};
router.get('/', function(req, res, next) {
  var content=qs.stringify(req._parsedUrl).substring(qs.stringify(req._parsedUrl).indexOf('search')+20,qs.stringify(req._parsedUrl).indexOf('query')-1);
  res.set({
    "Content-Type": "text/html;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
    "Access-Control-Allow-Credentials": "true"
  })
  Promise.all([reqapi1(content)]).then(function(resp) {
    console.log('启动成功')
    res.send(resp[0])
  }).catch(function(e) {
    console.log('错误')
    res.send(e)
  })
});
module.exports = router;
