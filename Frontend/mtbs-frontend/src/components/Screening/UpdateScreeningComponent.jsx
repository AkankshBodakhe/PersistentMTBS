import React from 'react'
import {useEffect, useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'

import { getScreening, updateScreening } from '../../services/ScreeningService';
import { listMovie } from '../../services/MovieService';
import { listAuditorium } from '../../services/AuditoriumService';
import HeaderComponent from '../HeaderComponent';

const UpdateScreeningComponent = () => {
    const [id , setid] = useState();
    const [movie, setMovie] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [auditorium, setAuditorium] = useState([]);
    const [selectedAuditorium, setSelectedAuditorium] = useState('');
    
    const [seatsAvailable , setseatsAvailable] = useState('');
    const [date , setdate] = useState('');
    const [startTime , setstartTime] = useState('');
    const [endTime , setendTime] = useState('');
    const [price , setprice] = useState('');
    const navigator = useNavigate();
    const {screeningid} = useParams();
    const [error, setError] = useState('');


    useEffect(() => {
      if (screeningid) {
          getScreening(screeningid)
              .then((response) => {
                  const data = response.data;
                  setid(data.id);
                  setSelectedMovie(data.movie.id); // Set selectedMovie to the movie id
                  setSelectedAuditorium(data.auditorium.id);
                  setdate(data.date);
                  setseatsAvailable(data.seatsAvailable);
                  setstartTime(data.startTime);  
                  setendTime(data.endTime);
                  setprice(data.price);
              })
              .catch(error => {
                  console.error(error);
              });
      }
  }, [screeningid]);
  

      useEffect(() => {
        listMovie()
          .then(response => {
            setMovie(response.data);
          })
          .catch(error => {
            console.error('Error fetching Movies', error);
          });
      }, []);
    
    
      const handleMovieChange = (e) => {
        setSelectedMovie(e.target.value);
      };


      useEffect(() => {
        listAuditorium()
          .then(response => {
            setAuditorium(response.data);
          })
          .catch(error => {
            console.error('Error fetching Audditoriums', error);
          });
      }, []);
    
    
      const handleAuditoriumChange = (e) => {
        setSelectedAuditorium(e.target.value);
      };

      function putScreening(e) {
        e.preventDefault();

        if (!date.trim()) {
          setError('Please enter date');
          return;
        }if (!startTime.trim()) {
          setError('Please enter start time');
          return;
        }if (!endTime.trim()) {
          setError('Please enter end time');
          return;
        }if (price===null) {
          setError('Please enter price');
          return;
        }

        const screening = {
          id,
            movie: {
                id: selectedMovie
            },
            auditorium: {
              id: selectedAuditorium
            },
            seatsAvailable,date,startTime,endTime,price
        }
        updateScreening(screeningid, screening).then((response) =>{
            console.log(response.data);
            navigator('/list-screening');
          }).catch(error => {
            console.error(error);
          })
            
        }
        
    
  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
      <HeaderComponent/>
<p/><p/>
        <div className='card col-md-6 offset-md-3 offst-md-3'>
        <h2 className='text-center'>Update Screening</h2>
          <div className='card-body'>
            <form>
            <div className='form-group mb-2'>
                <label className='form-label'>Screening id</label>
                <input
                  type='number'
                  placeholder='Enter screening id'
                  name='screening_id'
                  value={id}
                  className='form-control'
                  onChange={(e) => setid(e.target.value)}
                  readOnly
                >
                </input>
              </div>
              
              <div className='form-group mb-2'>
                <label className='form-label'>Select Movie</label>
                <select
                  className='form-control'
                  value={selectedMovie}
                  onChange={handleMovieChange}
                >
                  <option value=''>Select Movie</option>
                  {movie.map(movie => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className='form-group mb-2'>
                <label className='form-label'>Select Auditorium Name</label>
                <select
                  className='form-control'
                  value={selectedAuditorium}
                  onChange={handleAuditoriumChange}
                >
                  <option value=''>Select Auditorium</option>
                  {auditorium.map(auditorium => (
                    <option key={auditorium.id} value={auditorium.id}>
                    {auditorium.auditoriumName}, Seat Count: {auditorium.seatCount}                    
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Date(YYYY-MM-DD)</label>
                <input
                  type='text'
                  placeholder='Enter Date'
                  name='date'
                  value={date}
                  className='form-control'
                  onChange={(e) => setdate(e.target.value)}
                >
                </input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Start time</label>
                <input
                  type='text'
                  placeholder='Enter start time'
                  name='st'
                  value={startTime}
                  className='form-control'
                  onChange={(e) => setstartTime(e.target.value)}
                >
                </input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>End Time</label>
                <input
                  type='text'
                  placeholder='Enter end time'
                  name='et'
                  value={endTime}
                  className='form-control'
                  onChange={(e) => setendTime(e.target.value)}
                >
                </input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Price</label>
                <input
                  type='number'
                  placeholder='Enter price'
                  name='price'
                  value={price}
                  className='form-control'
                  onChange={(e) => setprice(String(e.target.value))} // Convert value to string
                >
                </input>
              </div>
              {error && (
    <div className="alert alert-danger" role="alert">
        {error}
    </div>
      )}

              

              <button className='btn btn-success' onClick={putScreening}>Submit</button>
            </form>
          </div>

        </div>

      </div>


    </div>

    
  )
  }



export default UpdateScreeningComponent