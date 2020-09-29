const EE = require('events');
const events = new EE();

require('dotenv').config();
const faker = require('faker');
const net = require('net');
const socket = new net.Socket();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localHost';


socket.connect({port: port, host:host}, ()=>{
  console.log(`Connected to the server on ${host} : ${port}`);
});
socket.on('data', buffer =>{
  let raw = buffer.toString();
  let object = JSON.parse(raw);
  checkForDelivered(object);
});
function checkForDelivered(object){
  if(object.event === 'delivered'){
    console.log('thank you for delivering ', object.payload.orderID)
  }
}
function fakeData(){
  const storeInfo = {
    event: 'pickup',
    time: new Date(),
    payload: {
      store: process.env.STORE,
      orderID: faker.random.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress()
    }
  }
  return storeInfo;
}

setInterval(() =>{
  sendNewOrder()
}, 5000)

function sendNewOrder(){
  let newPackage = JSON.stringify(fakeData());
  socket.write(newPackage);
}

module.exports = events;
