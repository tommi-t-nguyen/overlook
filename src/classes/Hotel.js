class Hotel {
  constructor(rooms,bookings) {
    this.rooms = rooms;
    this.bookings = bookings
  }
  findCustomerBooking(id){
    const customerBookings = this.bookings.reduce((acc, booking) => {
      if(booking.userID == id){
        acc.push(booking)
      }
      return acc
    },[]);
    return customerBookings
  }
  findCustomerTotal(id){
    const customerTotal = this.bookings.reduce((total,booking) =>{
      if(booking.userID == id){
        this.rooms.forEach(room => {
          if(room.number == booking.roomNumber){
            total+= room.costPerNight
          }
        })
      }
      return total
    },0)
    return Number(customerTotal.toFixed(2))
  }
  roomsAvailable(date) {
    let roomsBooked = this.bookings.reduce((acc,booking) => {
      if(booking.date === date){
        acc.push(booking.roomNumber)
      }
      return acc
    },[])
    let roomsAvailable = this.rooms.reduce((acc,room) => {
      if(!roomsBooked.includes(room.number)){
        acc.push(room);
      }
      return acc
    },[]);
    if(roomsAvailable.length === 0){
      return `<p>We're sorry there are no rooms available. Please select a different date.</p>`
    }else {
    return roomsAvailable
  }
}
}
export default Hotel;
