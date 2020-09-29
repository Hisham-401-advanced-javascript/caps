jest.useFakeTimers();
const emitter = require('../caps/caps.js');

const delivery = {
  store: '1800 no mo',
  orderID: '1234',
  customer: 'testeroni',
  address: '234 who de we appreciatre',
};

it('should log pickup', () => {
  console.log = jest.fn();
  emitter.emit('pickup', delivery);

  expect(console.log).toHaveBeenLastCalledWith('EVENT', expect.objectContaining({event: 'pickup'}));
});

it('should log in-transit', () => {
  console.log = jest.fn();
  emitter.emit('in-transit', delivery);

  expect(console.log).toHaveBeenLastCalledWith('EVENT', expect.objectContaining({event: 'in-transit'}));

});

it('should log delivered', () => {
  console.log = jest.fn();
  emitter.emit('delivered', delivery);
  expect(console.log).toHaveBeenLastCalledWith('EVENT', expect.objectContaining({event:'delivered'}))
});
