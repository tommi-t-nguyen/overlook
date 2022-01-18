import './css/base.scss';
import { fetchData, getUser } from './fetch';
import Hotel from '../src/classes/Hotel';

// global varibles
let currentCustomer, hotel, rooms, bookings



// functions
const onStart = (id) => {
  return Promise.all([getUser(id), fetchData('rooms'), fetchData('bookings')])
    .then(data => loadPage(data))
}
const loadPage = (data) => {
  currentCustomer = data[0];
  rooms = data[1];
  bookings = data[2];
  hotel = new Hotel(rooms, bookings);
  console.log(currentCustomer.id)
}
// event listeners
window.addEventListener('load', onStart(1));
