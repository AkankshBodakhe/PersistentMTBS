import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addScreening } from '../../services/ScreeningService';
import { listMovie } from '../../services/MovieService';
import { listAuditorium } from '../../services/AuditoriumService';
import HeaderComponent from '../HeaderComponent';

const AddScreeningComponent = () => {
  const [id, setid] = useState();
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [auditorium, setAuditorium] = useState([]);
  const [selectedAuditoriumid, setSelectedAuditoriumid] = useState();
  const [selectedSeatCount, setSelectedSeatCount] = useState();
  const [date, setdate] = useState('');
  const [startTime, setstartTime] = useState('');
  const [endTime, setendTime] = useState('');
  const [price, setprice] = useState('');
  const [error, setError] = useState('');
  
  
  const navigator = useNavigate();

  useEffect(() => {
    listMovie()
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleMovieChange = e => {
    setSelectedMovie(e.target.value);
  };

  useEffect(() => {
    listAuditorium()
      .then(response => {
        setAuditorium(response.data);
      })
      .catch(error => {
        console.error('Error fetching auditoriums:', error);
      });
  }, []);

  const handleAuditoriumChange = e => {
    const [selectedAuditoriumId, selectedSeatCount] = e.target.value.split(',');
    console.log(selectedAuditoriumId); // This will log the auditorium id
    console.log(selectedSeatCount); // This will log the seat count
    setSelectedAuditoriumid(selectedAuditoriumId);
    setSelectedSeatCount(selectedSeatCount);
  };

  function saveScreening(e) {
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
    }if (!price.trim()) {
      setError('Please enter price');
      return;
    }
    const screening = {
      id,
      movie: {
        id: selectedMovie
      },
      auditorium: {
        id: selectedAuditoriumid
      },
      seatsAvailable: selectedSeatCount, // Assign seatCount of selected auditorium
      date,
      startTime,
      endTime,
      price
    };
    addScreening(screening)
      .then(response => {
        console.log(response.data);
        navigator('/list-screening');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <HeaderComponent />
        <div className='card col-md-6 offset-md-3 offst-md-3'>
          <h2 className='text-center'>Add Screening</h2>
          <div className='card-body'>
            <form>
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
                  value={`${selectedAuditoriumid},${selectedSeatCount}`}
                  onChange={handleAuditoriumChange}
                    
                >
                  <option>Select Auditorium</option>
                  {auditorium.map(auditorium => (
                    <option key={auditorium.id} value={`${auditorium.id},${auditorium.seatCount}`}>
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
                  onChange={e => setdate(e.target.value)}
                />
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Start time</label>
                <input
                  type='text'
                  placeholder='Enter start time'
                  name='st'
                  value={startTime}
                  className='form-control'
                  onChange={e => setstartTime(e.target.value)}
                />
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>End Time</label>
                <input
                  type='text'
                  placeholder='Enter end time'
                  name='et'
                  value={endTime}
                  className='form-control'
                  onChange={e => setendTime(e.target.value)}
                />
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Price</label>
                <input
                  type='number'
                  placeholder='Enter price'
                  name='price'
                  value={price}
                  className='form-control'
                  onChange={e => setprice(e.target.value)}
                />
              </div>

              {error && (
    <div className="alert alert-danger" role="alert">
        {error}
    </div>
      )}

              <button className='btn btn-success' onClick={saveScreening}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScreeningComponent;
