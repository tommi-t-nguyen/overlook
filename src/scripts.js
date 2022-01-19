import './css/base.scss';
import { fetchData, getUser, bookRoomPost } from './fetch';
import Hotel from '../src/classes/Hotel';
import domUpdates from './domUpdates'

// global varibles
let currentCustomer, hotel, currentCustomerBookings, roomsAvailable, date

// query selector
const navBar = document.querySelector('.nav-bar')
const login = document.querySelector('.login')
const welcomeContainer = document.querySelector('#welcomeContainer')
const bookingContainer = document.querySelector('#bookingsBoard')
const bookingPage = document.querySelector('#bookingPage')
const showRoomsAvailable = document.querySelector('#showRoomsAvailable')
const bookingMessage = document.querySelector('#bookingMessage')
const bookRoom = document.querySelector('#bookRoom')
const bookBtn = document.querySelector('#book')
const homeBtn = document.querySelector('#home')
const loginForm = document.querySelector('#login')
const loginMessage = document.querySelector('.login-message')



// functions
const onStart = (id) => {
  return Promise.all([getUser(id), fetchData('rooms'), fetchData('bookings')])
    .then(data => loadPage(data))
}

const loadPage = (data) => {
  currentCustomer = data[0];
  hotel = new Hotel(data[1].rooms, data[2].bookings);
  welcomeContainer.innerHTML = '';
  welcomeContainer.innerHTML += domUpdates.renderGreeting(currentCustomer, hotel);
  currentCustomerBookings = hotel.findCustomerBooking(currentCustomer.id);
  currentCustomerBookings.sort((a,b) =>{
    return new Date(b.date) - new Date(a.date)
  })
  console.log(currentCustomerBookings);
  loadBookings(currentCustomerBookings);
}

const loadBookings = (currentCustomerBookings) => {
  bookingContainer.innerHTML = `<h3 class='booking-history'>Your Booking History</h3>`;
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
  }else if (filterRoom.length === 0){
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
    .then(response => onStart(currentCustomer.id))
    displayHome()
    bookingMessage.innerHTML = `<p class='booking-message' id='bookingMessage'>Select a date to see available rooms!</p>`
  }
}

const displayBooking = () => {
  bookingContainer.style.display="none"
  bookingPage.style.display="block"
}
const displayHome = () => {
  bookingContainer.style.display="block"
  bookingPage.style.display="none"
}



// event listeners
bookingMessage.addEventListener('click',  (e) => {
  bookARoom(e)
});

bookBtn.addEventListener('click',displayBooking);
homeBtn.addEventListener('click',displayHome);
loginForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userName = formData.get('name');
  let userID = Number(userName.slice(8));
  const password = formData.get('password');
  if(userName.slice(0,8) == 'customer' && password == 'overlook2021' && userID < 51){
    onStart(userID);
    navBar.style.display="flex"
    login.style.display="none"
    bookingContainer.style.display="block"
    e.target.reset()
  }else {
    loginMessage.innerText = 'Incorrect Username or Password. Please try again'
    e.target.reset()
  }
})

showRoomsAvailable.addEventListener('submit', (e) => {
  e.preventDefault();
  bookingMessage.innerHTML = '';
  const formData = new FormData(e.target);
  date = formData.get('date').replace(/-/gi, "/");
  let roomType = formData.get('roomType')
  roomsAvailable = hotel.roomsAvailable(date)
  filterRoom(date, roomType);
  e.target.reset()
});
