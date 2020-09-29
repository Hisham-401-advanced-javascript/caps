// const driver = require('../modules/driver');
const emitter = require('../driver/driver');

jest.useFakeTimers();

beforeEach(jest.clearAllTimers);

const delivery = {
  store: '1800 no mo',
  orderID: '1234',
  customer: 'testerRoni',
  address: '1234 get dr, me crazy, ca'
};

describe('handle pick up event', ()=>{
  it('should emit in-transit event at right time', () => {
    console.log = jest.fn();
    const inTransitHandler = jest.fn();
    emitter.on('in-transit', inTransitHandler);

    emitter.emit('pickup', delivery);

    expect(inTransitHandler).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);

    expect(inTransitHandler).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(`Driver: picked up ${delivery.orderID}`);

  });

  it('should emit delivered event at right time', () => {
    console.log = jest.fn();
    const deliveredHandler = jest.fn();

    emitter.on('in-transit', deliveredHandler);

    emitter.emit('pickup', delivery);

    expect(deliveredHandler).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(3000);

    expect(deliveredHandler).toHaveBeenCalledTimes(1);

    expect(console.log).toHaveBeenLastCalledWith(`Driver: picked up ${delivery.orderID}`);
  });

});
