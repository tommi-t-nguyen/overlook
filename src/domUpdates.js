const domUpdates = {
  renderGreeting(currentCustomer,hotel) {
    return `<div class='welcome-container' id='welcomeContainer'>
      <h3 class='greeting' id='greeting'> Welcome back, ${currentCustomer.name}!</h3>
      <h3 class='total-spent' id='totalSpent'>You have spent $${hotel.findCustomerTotal(currentCustomer.id)} on rooms so far.</h3>
    </div>`
  },
  renderBooking(booking) {
    return`<p class='booking'>${booking.date} room ${booking.roomNumber} is booked</p>`
  },
  renderAvailableRooms(room){
    return`<h3 class='room-number'>Room ${room.number}</h3>
          <p class='room-description'> A ${room.roomType} with ${room.numBeds} ${room.bedSize} bed(s) at the price of $${room.costPerNight}</p>
          <button class='book-room' id='${room.number}'>Book Me </button>`
  }
}
export default domUpdates;
