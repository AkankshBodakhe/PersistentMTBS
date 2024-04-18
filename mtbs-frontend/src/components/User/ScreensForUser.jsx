import React from 'react'
import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { listScreening } from '../../services/ScreeningService';


const ScreensForUser = () => {
    const [screening, setscreening] = useState([])

    const navigator = useNavigate();

    const {userID} = useParams();

    useEffect(()=> {
        listScreening().then((response)=>{
            setscreening(response.data); 
         }).catch(error => {
             console.error(error);
         })  
    }, [])
        
    function BookScreening(s_id,u_id){
        navigator(`/book-tickets-user/${s_id}/${u_id}`)
    }
    
  return (
    <div className='container'>
        <h2 className='text-center'>SCREENINGS</h2>
        <table className='table table-striped table-bordered'>
            <thead>
            <tr>
            <th>Date (YYYY-MM-DD)</th>
            <th>Movie Title</th>
            <th>Theatre Name</th>
            <th>Auditorium Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Price</th>
            <th>Seats available</th>
            <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                screening.map(screen =>
                <tr key={screen.id}>
                    <td>{screen.date}</td>
                    <td>{screen.movie.title}</td>
                    <td>{screen.auditorium.theatre.name}</td>
                    <td>{screen.auditorium.auditoriumName}</td>
                    <td>{screen.startTime}</td>
                    <td>{screen.endTime}</td>
                    <td>{screen.price}</td>
                    <td>{screen.seatsAvailable}</td>
                     <td>
                        <button className='btn btn-info m-2' onClick={() => BookScreening(screen.id,userID)}>Book Tickets</button>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    </div>
  )
}

export default ScreensForUser