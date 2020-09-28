'use strict';
require('dotenv').config();
const net = require('net');
const client = new net.Socket();
// connect to server.js using port + host(ip-address) the same as what the main server had(caps.js)
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
client.connect(PORT, HOST, ()=> {console.log('vendor got connected');});
const faker = require('faker');
const { v4: uuidv4 } = require('uuid'); // To make random ID.
const STORENAME = process.env.STORENAME;
// Send the fake order data to server using client.write every 5 min==>

setInterval(
  function () {
    let obj={storeName:STORENAME,
      customerName:faker.name.findName(),
      address:faker.address.streetAddress(),
      id:uuidv4()
    };
    let message={event :'pickup',payload:obj}
    let event = JSON.stringify(message);
    client.write(event);
  },5000);
  
// Here we want to retrive 'data' from server using data event==>
const messages = [];
client.on('data', function(data){ 
  let eventObj = JSON.parse(data);
  if (eventObj.event == 'delivered') {
    console.clear();
    messages.push(eventObj.payload.id);
    messages.forEach(msg=> console.log(`Thank you for delivering ${msg}`));
  }
});