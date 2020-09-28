'use strict';

const net = require('net');
const PORT = process.env.PORT || 3000;
const { v4: uuidv4 } = require('uuid'); // To make random ID.

const server = net.createServer(); 
server.listen(PORT, ()=> console.log(`Server is up on ${PORT}`));

// Here we start our server and the 'connection' event is for define that this file is the main server and other files are client connect to it.
let socketPool={};
server.on('connection', (socket)=> {
    
  // create a unique ID for the connection of each client
  const id = `Socket-${uuidv4()}`; // uuid package
  // add the socket objec to the SocketPool Object
  console.log(`client with ID : ${id} is connected!!! `);
  socketPool[id] = socket;
  // console.log(socketPool);
  // Here we got the data from the vendor and handle it with the 'dispatchEvent()'function.
  socket.on('data', (buffer)=> dispatchEvent(buffer));
  
  socket.on('error', (e) => {console.log('SOCKET ERR', e);});

  socket.on('end', (end) => {
    console.log('connection ended', end);
    delete socketPool[id];
  });
});
server.on('error', (e)=> {
  console.log('SERVER ERROR', e);
});

// This function will handle the data that we got from vendor and console it.
function dispatchEvent(buffer) {
  let data = JSON.parse(buffer.toString().trim());
  // data.payload.id=uuidv4();
  pickup(data);
}

function pickup(data) {
  let time = new Date();
  let event = data.event;
  let payload =data.payload;
  console.log('Event',{event,time, payload});
  broadcast(data);
}

// This function will store data in socket to use it in vendor and driver using '.write' method
function broadcast(msg) {
  let event = JSON.stringify(msg);
  for (let key in socketPool) {
    socketPool[key].write(event);
  }
}