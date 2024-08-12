import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { deleteBooking, getBookingByUserID } from '../../services/BookingService';

const GetBookingByUserID = () => {
  const { userID } = useParams();
  const [bookings, setBookings] = useState([]);
  const navigator = useNavigate();
  
  useEffect(() => {
    getBookingByUserID(userID)
    .then(response => {
      setBookings(response.data);
    })
    .catch(error => {
      console.error('Error fetching bookings:', error);
    });  }, []);

  

  function cancelBooking(id){
        console.log(id);
        //navigator(`/delete-auditorium/${id}`)

        deleteBooking(id).then((response)=>{
            getBookingByUserID(userID);
        }).catch(error => {
            console.error(error);
        })
        navigator(`/getbookingbyuserid/${userID}`);
    }  

  return (
    <div className='container'>
        <h2 className='text-center'>BOOKING LIST</h2>
        <table className='table table-striped table-bordered'>
            <thead>
            <tr>
                <th>Booking ID</th>
                <th>User ID</th>
                <th>Movie</th>
                <th>Auditorium</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>                
                <th>Seats Booked</th>                
                <th>Price</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                bookings.map(book =>
                <tr key= {book.id}>
                    <td>{book.id}</td>
                    <td>{book.user.id}</td>
                    <td>{book.screening.movie.title}</td>
                    <td>{book.screening.auditorium.id}</td>
                    <td>{book.screening.date}</td>
                    <td>{book.screening.startTime}</td>
                    <td>{book.screening.endTime}</td>
                    <td>{book.seatsBooked}</td>
                    <td>{book.screening.price}</td>
                    <td>
                <button className='btn btn-danger m-lg-1' onClick={() => cancelBooking(book.id)}>Cancel</button>
                </td>
                </tr>
                
            )}
            </tbody>
        </table>
        
    </div>
  );
}

export default GetBookingByUserID;
