import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { listBooking } from '../../services/BookingService'
import HeaderComponent from '../HeaderComponent'

const ListBookingComponent = () => {

    const [booking, setBooking] = useState([])

    const navigator = useNavigate();

    useEffect(()=> {
        getAllBooking();
    }, [])

    function getAllBooking(){
        listBooking().then((response)=>{
            setBooking(response.data); 
         }).catch(error => {
             console.error(error);
         })
    }

    function updateBooking(id){
        navigator(`/update-booking/${id}`)
    }

  return (
    <div className='container'>
    <HeaderComponent/>
<br/><p/>
        <h2 className='text-center'>BOOKING LIST</h2>
        <table className='table table-striped table-bordered'>
            <thead>
            <tr>
                <th>Booking ID</th>
                <th>User ID</th>
                <th>Movie</th>
                <th>Auditorium Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>                
                <th>Seats Booked</th>                
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
                {
                booking.map(book =>
                <tr key= {book.id}>
                    <td>{book.id}</td>
                    <td>{book.user.id}</td>
                    <td>{book.screening.movie.title}</td>
                    <td>{book.screening.auditorium.auditoriumName}</td>
                    <td>{book.screening.date}</td>
                    <td>{book.screening.startTime}</td>
                    <td>{book.screening.endTime}</td>
                    <td>{book.seatsBooked}</td>
                    <td>{book.screening.price}</td>
                    {/* <td>
                        <button className='btn btn-info m-2' onClick={() => updateBooking(book.id)}>Update</button>
                        <button className='btn btn-danger' onClick={() => removeAuditorium(audi.id)}>Delete</button>
                    </td> */}
                </tr>
            )}
            </tbody>
        </table>
        
    </div>
    )
}

export default ListBookingComponent