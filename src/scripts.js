import './css/base.scss';
import { fetchData, getUser } from './fetch';
import Hotel from '../src/classes/Hotel';
import domUpdates from './domUpdates'

// global varibles
let currentCustomer, hotel

// query selector
const welcomeContainer = document.querySelector('#welcomeContainer')

// functions
const onStart = (id) => {
  return Promise.all([getUser(id), fetchData('rooms'), fetchData('bookings')])
    .then(data => loadPage(data))
}
const loadPage = (data) => {
  currentCustomer = data[0];
  hotel = new Hotel(data[1].rooms, data[2].bookings);
  welcomeContainer.innerHTML = domUpdates.renderGreeting(currentCustomer,hotel);
  
}
// event listeners
window.addEventListener('load', onStart(1));
