import { expect } from 'chai';
import customers from './test-data/customers-test-data';
import rooms from './test-data/rooms-test-data';
import bookings from './test-data/booking-test-data';
import Hotel from '../src/classes/Hotel';

describe('Hotel',() => {
  let currentCustomer, previousCustomer,hotel;
  beforeEach(() =>{
    currentCustomer = customers[0];
    previousCustomer = customers[1];
    hotel = new Hotel(rooms,bookings);
  });

  it('Should be a function', () => {
   expect(Hotel).to.be.a('function');
 });

  it('Should hold room data', () => {
    expect(hotel.rooms).to.equal(rooms);
  });

  it('Should hold booking data', () => {
    expect(hotel.bookings).to.equal(bookings);
  });

  it('Should be able to find all of current customer\'s booking', () => {
    expect(hotel.findCustomerBooking(currentCustomer.id)).to.deep.equal([bookings[0],bookings[2]]);
    expect(hotel.findCustomerBooking(previousCustomer.id)).to.deep.equal([bookings[1],bookings[3]]);
  });

  it('Should be able to find customer\'s total', () => {
    expect(hotel.findCustomerTotal(currentCustomer.id)).to.equal(849.54);
    expect(hotel.findCustomerTotal(previousCustomer.id)).to.equal(874.40)
  });

  it('Should be able to find rooms available on a given date', () => {
    expect(hotel.roomsAvailable("2022/04/22")).to.deep.equal([rooms[1],rooms[2],rooms[3]]);
    expect(hotel.roomsAvailable("2022/06/22")).to.equal(`<p>We're sorry there are no rooms available. Please select a different date.</p>`)
  })






});
