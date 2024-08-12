import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBooking, updateBooking } from '../../services/BookingService';
import { listScreening } from '../../services/ScreeningService';

const UpdateBookingComponent = () => {
    const [id , setid] = useState('');
    const [screeningId, setScreeningId] = useState('');
    const [seatsBooked, setSeatsBooked] = useState();
    const [user, setUser] = useState({
        id: '',
        userName: '',
        password: ''
    });
    const [screenings, setScreenings] = useState([]);
    const navigator = useNavigate();
    const { bookingid } = useParams();

    useEffect(() => {
        if (bookingid) {
            getBooking(bookingid)
                .then((response) => {
                    setid(response.data.id);
                    setScreeningId(response.data.screening.id);
                    setSeatsBooked(response.data.seatsBooked);
                    setUser(response.data.user);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [bookingid]);

    useEffect(() => {
        fetchScreenings();
    }, []);

    const fetchScreenings = () => {
        listScreening()
            .then(response => {
                setScreenings(response.data);
            })
            .catch(error => {
                console.error('Error fetching screenings:', error);
            });
    };

    const handleScreeningChange = (e) => {
        setScreeningId(e.target.value);
    };

    const handleSeatBookedChange = (e) => {
        setSeatsBooked(e.target.value);
    };

    function putBooking(e) {
        e.preventDefault();
        const booking = {
            id,
            screening: {
                id: screeningId
            },
            seatsBooked,
            user: {
                id: user.id,
                userName: user.userName,
                password: user.password
            }
        };
        updateBooking(bookingid, booking)
            .then((response) => {
                console.log(response.data);
                navigator('/list-booking');
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offst-md-3'>
                    <h2 className='text-center'>Update Booking</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Booking id</label>
                                <input
                                    type='number'
                                    placeholder='Enter Booking id'
                                    name='booking_id'
                                    value={id}
                                    className='form-control'
                                    onChange={(e) => setid(e.target.value)}
                                    readOnly
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Screening ID</label>
                                <select
                                    className='form-control'
                                    value={screeningId}
                                    onChange={handleScreeningChange}
                                >
                                    <option value=''>Select Screening ID</option>
                                    {screenings.map(screening => (
                                        <option key={screening.id} value={screening.id}>
                                            {screening.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Seat Booked</label>
                                <input
                                    type='number'
                                    placeholder='Enter Seat Booked'
                                    name='booking_id'
                                    value={seatsBooked}
                                    className='form-control'
                                    onChange={(e) => setSeatsBooked(e.target.value)}
                                />
                            </div>
                            <button className='btn btn-success' onClick={putBooking}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBookingComponent;
