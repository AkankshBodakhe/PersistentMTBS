import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getScreening, updateScreening } from '../../services/ScreeningService';
import { addBooking as addBookingService } from '../../services/BookingService'; // Renamed addBooking service
import { useNavigate } from 'react-router-dom';
const BookScreeningByUserID = () => {
  const { screenID, userID } = useParams();
  const navigator = useNavigate();

  const [screening, setscreening] = useState({
    id: '',
    movie: {
      id: '',
      title: '',
      genre: '',
      duration: ''
    },
    auditorium: {
      id: '',
      theatre: {
        id: '',
        name: ''
      }
    },
    seatsAvailable:'',
    date: '',
    startTime: '',
    endTime: '',
    price: ''
  });

  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Add leading zeros if needed
  hours = (hours < 10 ? '0' : '') + hours;
  minutes = (minutes < 10 ? '0' : '') + minutes;
  seconds = (seconds < 10 ? '0' : '') + seconds;

  const currentTime = `${hours}:${minutes}:${seconds}`;

  console.log(currentTime);

  const [seatsBooked, setSeatsBooked] = useState('');

  useEffect(() => {
    if (screenID) {
      getScreening(screenID)
        .then((response) => {
          const { id, movie, auditorium, date, startTime, seatsAvailable,endTime, price } = response.data;
          setscreening({
            id,
            movie,
            auditorium,
            seatsAvailable,
            date,
            startTime,
            endTime,
            price
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [screenID]);

  console.log(screening);

  function addBooking(e) {
    e.preventDefault();
    const booking = {
      screening: {
        id: screenID
      },
      user: {
        id: userID
      },
      seatsBooked,
      bookingTime: currentTime,
      booked: true
    };

    addBookingService(booking)
      .then((response) => {
        screening.seatsAvailable  = screening.seatsAvailable - parseInt(seatsBooked); // Calculate updated seatsAvailable
        // Update the screening table in the database with new seatsAvailable value
        updateScreening(screenID, screening);
        console.log(screening.seatsAvailable)
        console.log(response.data);
        navigator(`/acknowledgement-window/${userID}`);
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offst-md-3'>
          <h2 className='text-center'>Confirm booking details</h2>
          <div className='card-body'>
            <form>
            <div className='form-group mb-2'>
                 <label className='form-label'>User ID</label>
               <input
                type='text'
                name='user_id'
                value={userID}
                className='form-control'
                onChange={(e) => setuser({...user,id: e.target.value})}
                readOnly
                >
              </input>
            </div>

            <div className='form-group mb-2'>
               <label className='form-label'>Screening ID</label>
              <input
              type='number'
              name='screening_id'
              value={screening.id}
              className='form-control'
              onChange={(e) => setscreening({...screening, id: e.target.value})}
              >
              </input>
            </div>

            <div className='form-group mb-2'>
                <label className='form-label'>Movie name</label>
                <input
                  type='text'
                  placeholder='Enter movie name'
                  name='movie_name'
                  value={screening.movie.title}
                  className='form-control'
                  onChange={(e) => setscreening({...screening, movie: {...screening.movie, id: e.target.value}})}
                  readOnly
                >
                </input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Auditorium ID</label>
                <input
                  type='number'
                  placeholder='Enter auditorium ID'
                  name='auditorium_id'
                  value={screening.auditorium.id}
                  className='form-control'
                  onChange={(e) => setscreening({...screening, auditorium: {...screening.auditorium, id: e.target.value}})}
                  >
                </input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Date(YYYY-MM-DD)</label>
                <input
                  type='text'
                  placeholder='Enter Date'
                  name='date'
                  value={screening.date}
                  className='form-control'
                  onChange={(e) => setscreening({...screening, date: e.target.value})}
                  >
                </input>
              </div>

              <div className='form-group mb-2'>
                 <label className='form-label'>Start time</label>
                <input
                  type='text'
                  placeholder='Enter start time'
                  name='st'
                 value={screening.startTime}
                  className='form-control'
                  onChange={(e) => setscreening({...screening, startTime: e.target.value})}
                >
                </input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>End Time</label>
                <input
                  type='text'
                  placeholder='Enter end time'
                  name='et'
                  value={screening.endTime}
                  className='form-control'
                  onChange={(e) => setscreening({...screening, endTime: e.target.value})}
                >
                </input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Price</label>
                <input
                  type='number'
                  placeholder='Enter price'
                  name='price'
                  value={screening.price}
                  className='form-control'
                  onChange={(e) => setscreening({...screening, price: e.target.value})}
                >
                </input>
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Seats Booked</label>
                <input
                  type='text'
                  placeholder='Enter seats booked'
                  name='seats_booked'
                  value={seatsBooked}
                  className='form-control'
                  onChange={(e) => setSeatsBooked(e.target.value)}
                />
              </div>

              <button className='btn btn-success' onClick={addBooking}>Confirm booking</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookScreeningByUserID;
