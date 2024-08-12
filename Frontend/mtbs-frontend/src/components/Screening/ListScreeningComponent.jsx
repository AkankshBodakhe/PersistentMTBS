import React from 'react'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { deleteScreening, listScreening } from '../../services/ScreeningService';
import HeaderComponent from '../HeaderComponent';

const ListScreeningComponent = () => {
    const [screening, setscreening] = useState([])

    const navigator = useNavigate();

    useEffect(()=> {
        getAllScreening();
    }, [])

    function getAllScreening(){
        listScreening().then((response)=>{
            setscreening(response.data); 
         }).catch(error => {
             console.error(error);
         })
    }

    function updateScreening(id){
        navigator(`/update-screening/${id}`)
    }

    function addNewScreeening(){
        navigator('/add-screening')
    }

    function removeScreening(id){
        console.log(id);

        deleteScreening(id).then((response)=>{
            getAllScreening();
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>
        <HeaderComponent/>
        <p/><p/>
        <h2 className='text-center'>SCREENING LIST</h2>
        <button className='btn btn-primary mb-2' onClick={addNewScreeening}>Add Screening</button>
        <table className='table table-striped table-bordered'>
            <thead>
            <tr>
                <th>Screening ID</th>
                <th>Movie ID</th>
                <th>Movie Title</th>
                <th>Auditorium Name</th>
                <th>Theatre Name</th>
                <th>Available seats</th>
                <th>Total seats</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                screening.map(screen =>
                <tr key= {screen.id}>
                    <td>{screen.id}</td>
                    <td>{screen.movie.id}</td>
                    <td>{screen.movie.title}</td>
                    <td>{screen.auditorium.auditoriumName}</td>
                    <td>{screen.auditorium.theatre.name}</td>
                    <td>{screen.seatsAvailable}</td>
                    <td>{screen.auditorium.seatCount}</td>
                    <td>{screen.date}</td>
                    <td>{screen.startTime}</td>
                    <td>{screen.endTime}</td>
                    <td>{screen.price}</td>
                     <td>
                        <button className='btn btn-info m-2' onClick={() => updateScreening(screen.id)}>Update</button>
                        <button className='btn btn-danger' onClick={() => removeScreening(screen.id)}>Delete</button>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
        
    </div>
  )
}

export default ListScreeningComponent