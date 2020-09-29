'use strict';
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');
const STORENAME = process.env.STORENAME || 'hisham store';
socket.emit('join',STORENAME);
socket.on('delivered', (data)=> {
  console.log(`Thank you for delivering ${data.id}`);
});
setInterval(
  function () {
    let obj={storeName:STORENAME,
      id:uuidv4(),
      customerName:faker.name.findName(),
      address:faker.address.streetAddress(),
    };
    socket.emit('pickup',obj)
  },5000);
