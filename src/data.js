var express = require('express')
var cors = require('cors')
app = express()
app.use(cors())
server = require('http').Server(app)
io = require('socket.io')(server)
port = 3001

//Server start
server.listen(port, () => console.log('on port' + port))

//user server
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
//     })

io.on('connection', onConnection)

var connectedSocket = null
function onConnection(socket) {
  connectedSocket = socket
}

const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const usbport = new SerialPort('COM4')
const parser = usbport.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', function (data) {
  console.log(data)
  io.emit('serialdata', { data: data })
})
