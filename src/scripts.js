import './css/base.scss';
import { fetchData, getUser } from './fetch';
import Hotel from '../src/classes/Hotel';
import domUpdates from './domUpdates'

// global varibles
let currentCustomer, hotel, currentCustomerBookings

// query selector
const welcomeContainer = document.querySelector('#welcomeContainer')
const bookingContainer = document.querySelector('#bookingsBoard')
// functions
const onStart = (id) => {
  return Promise.all([getUser(id), fetchData('rooms'), fetchData('bookings')])
    .then(data => loadPage(data))
}

const loadPage = (data) => {
  currentCustomer = data[0];
  hotel = new Hotel(data[1].rooms, data[2].bookings);
  welcomeContainer.innerHTML = domUpdates.renderGreeting(currentCustomer,hotel);
  currentCustomerBookings = hotel.findCustomerBooking(currentCustomer.id);
  loadBookings(currentCustomerBookings);
}

const loadBookings = (currentCustomerBookings) => {
  bookingContainer.innerHTML = '';
  currentCustomerBookings.forEach(booking =>{
    bookingContainer.innerHTML += domUpdates.renderBooking(booking)
  })
}

// event listeners
window.addEventListener('load', onStart(5));
