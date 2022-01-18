const domUpdates = {
  renderGreeting(currentCustomer,hotel) {
    return `<div class='welcome-container' id='welcomeContainer'>
      <h1 class='greeting' id='greeting'> Welcome back, ${currentCustomer.name}!</h1>
      <h2 class='total-spent' id='totalSpent'>You have spent $${hotel.findCustomerTotal(currentCustomer.id)} on trips this year.</h2>
    </div>`
  },
  renderBooking(booking) {
    return`<p class='booking'>${booking.date} room ${booking.roomNumber} is booked</p>`
  }

}
export default domUpdates;
