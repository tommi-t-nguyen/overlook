import './css/base.scss';
import { fetchData, getUser, bookRoomPost } from './fetch';
import Hotel from '../src/classes/Hotel';
import domUpdates from './domUpdates'

// global varibles
let currentCustomer, hotel, currentCustomerBookings, roomsAvailable, date

// query selector
const welcomeContainer = document.querySelector('#welcomeContainer')
const bookingContainer = document.querySelector('#bookingsBoard')
const bookingPage = document.querySelector('#bookingPage')
const showRoomsAvailable = document.querySelector('#showRoomsAvailable')
const bookingMessage = document.querySelector('#bookingMessage')
const bookRoom = document.querySelector('#bookRoom')
// functions
const onStart = (id) => {
  return Promise.all([getUser(id), fetchData('rooms'), fetchData('bookings')])
    .then(data => loadPage(data))
}

const loadPage = (data) => {
  currentCustomer = data[0];
  hotel = new Hotel(data[1].rooms, data[2].bookings);
  welcomeContainer.innerHTML = domUpdates.renderGreeting(currentCustomer, hotel);
  currentCustomerBookings = hotel.findCustomerBooking(currentCustomer.id);
  console.log(currentCustomerBookings);
  loadBookings(currentCustomerBookings);
}

const loadBookings = (currentCustomerBookings) => {
  bookingContainer.innerHTML = '';
  currentCustomerBookings.forEach(booking => {
    bookingContainer.innerHTML += domUpdates.renderBooking(booking)
  })
}

const filterRoom = (date, roomType) => {
  let filterRoom = roomsAvailable.filter(room => room.roomType == roomType)
  if (roomType == "") {
    roomsAvailable.forEach(room => {
      bookingMessage.innerHTML += domUpdates.renderAvailableRooms(room)
    })
  }else if (filterRoom.length == 0){
    bookingMessage.innerHTML += `<p>Sorry no rooms available. Please refined your search!</p>`
  }
   else {
    filterRoom.forEach(room => {
      bookingMessage.innerHTML += domUpdates.renderAvailableRooms(room)
    })
  }
}

const bookARoom = (e) => {
  if(e.target.closest('button')){
  const roomToBeBook = {
    userID: currentCustomer.id,
    date: date,
    roomNumber: Number(e.target.closest('button').id)
  }
  bookRoomPost(roomToBeBook)
  .then(response => onStart(5))
}
}


// event listeners
window.addEventListener('load', onStart(5));
bookingMessage.addEventListener('click',  (e) => {
  bookARoom(e)
});

showRoomsAvailable.addEventListener('submit', (e) => {
  e.preventDefault();
  bookingMessage.innerHTML = '';
  const formData = new FormData(e.target);
  date = formData.get('date').replace(/-/gi, "/");
  let roomType = formData.get('roomType')
  roomsAvailable = hotel.roomsAvailable(date)
  filterRoom(date, roomType);
});
