const vendor = require('../vendor/vendor');
const emitter = require('../vendor/vendor');

jest.useFakeTimers();

it('should receive delivery politely hahaha', () => {
  console.log = jest.fn();
  emitter.emit('delivered', { orderID: '1234'});
  expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivery 1234');
});

it('should emit order', () => {
  const callback = jest.fn();
  emitter.on('pickup', callback);

  expect(callback).not.toBeCalled();
  vendor.start();
  jest.runOnlyPendingTimers();
  expect(callback).toBeCalledWith(expect.objectContaining({store:'1800 no mo'}));

  expect(callback).toHaveBeenCalledTimes(1);
});
