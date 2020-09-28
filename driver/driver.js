'use strict';

const net = require('net');
const client = new net.Socket();
// connect to server.js using port + host(ip-address) the same as what the main server had(caps.js)
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, ()=> {console.log('logger got connected');});
// Here we got the stored data from the socket and cosole some stuff.
client.on('data', function(data) {
  let data1 = JSON.parse(data);
  if(data1.event=='pickup'){
    setTimeout(function(){console.log(`DRIVER: Picked up ${data1.payload.id}`);
      let message={event :'in-transit',payload:data1.payload};
      let event = JSON.stringify(message);
      client.write(event);
    },1000);
    setTimeout(function(){console.log(`DRIVER: Delivered ${data1.payload.id}`);
      let message={event :'delivered',payload:data1.payload};
      let event = JSON.stringify(message);
      client.write(event);
    },3000);
  }
});
client.on('close', function() {
  console.log('Logger Connection got closed');
});