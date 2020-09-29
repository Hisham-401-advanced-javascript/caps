const EE = require('events');
const events = new EE();

require('dotenv').config();
const net = require('net');
const socket = new net.Socket();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localHost';

//connect
socket.connect({ port: port, host: host}, () =>{
  console.log('Connected to the server on', host,':', port)
})

socket.on('data', buffer =>{
  let raw = buffer.toString();
  let object = JSON.parse(raw);
  if(object.event==='pickup'){
    simulatePickup(object);
  }
});

function simulatePickup(object){
  setTimeout(()=>{
    let newObject = {
      event: 'in-transit',
      payload: object.payload,
    };
    console.log('picking up ', newObject.payload.orderID)
    let stringVersion = JSON.stringify(newObject);
    socket.write(stringVersion);
    simulateDelivery(object);
  }, 1000);

  function simulateDelivery(object){
    setTimeout(()=>{
      let message = {
        event: 'delivered',
        payload: object.payload,
      };
      let stringVersion = JSON.stringify(message);
      socket.write(stringVersion);
    }, 3000)
  }
}

module.exports = events;
