export const fetchData = (name) =>{
  return fetch(`http://localhost:3001/api/v1/${name}`)
    .then(response => response.json())
}
export const getUser = (id) =>{
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => response.json())
}
export const bookRoomPost = (roomToBeBook) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roomToBeBook)
  })
    .then(response => response.json())
}
