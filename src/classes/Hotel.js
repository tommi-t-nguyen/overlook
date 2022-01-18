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
    return customerTotal
  }
}
export default Hotel;
