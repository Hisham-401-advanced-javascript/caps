'use strict';

const caps=require('../caps/caps');
const driver=require('../driver/driver');
const vendor=require('../vendor/vendor');

describe('Event Driven',()=>{
  let order={
    storeName: 'A96',
    orderId: 5591,
    customerName: 'Ahmad',
    address: 'Canda',
  };

  let spy = jest.spyOn(console, 'log').mockImplementation();

  it('pick up',()=>{
    events.emit('pickup',order);
    expect(spy).toHaveBeenCalled();
  });
  it('transit',()=>{
    events.emit('transit',order);
    expect(spy).toHaveBeenCalled();
  });
  it('delivered',()=>{
    events.emit('delivered',order);
    expect(spy).toHaveBeenCalled();
  });
});