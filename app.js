var express = require('express');
var nunjucks = require('nunjucks');
var index = require('./router/index');
var jsonApi = require('./router/json')
var data = require('./router/data')
var app = express();

const server = require('http').Server(app);
const io=require('socket.io')(server)
io.on('connection', (socket) => {

  // 群聊
  socket.on('sendGroupMsg', function (data) {
    socket.broadcast.emit('receiveGroupMsg', data);
  });

  // 上线
  socket.on('online', name => {
    socket.broadcast.emit('online', name)
  });


})

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.use('/', index);
app.use('/json', jsonApi);
app.use('/data', data);

module.exports = server.listen(3000, function (err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:3000/')
});
