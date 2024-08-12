import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuditorium, updateAuditorium } from '../../services/AuditoriumService';
import { listTheatre } from '../../services/TheatreService';
import HeaderComponent from '../HeaderComponent';

const UpdateAuditoriumComponent = () => {
  const [theatre, setTheatre] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [seatCount, setSeatCount] = useState('');
  const [id, setid] = useState('');
  const navigator = useNavigate();
  const { audiid } = useParams();
  const [error, setError] = useState('');
  
  
  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = () => {
    listTheatre()
      .then(response => {
        setTheatre(response.data);
      })
      .catch(error => {
        console.error('Error fetching theatres:', error);
      });
  };

  const handleTheatreChange = (e) => {
    setSelectedTheatre(e.target.value);
  };

  useEffect(() => {
    if (audiid) {
      getAuditorium(audiid)
        .then((response) => {
          setid(response.data.id);
          setSeatCount(response.data.seatCount);
          setTheatre(response.data.theatre);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [audiid]);

  function putAuditorium(e) {
    e.preventDefault();

    if (!seatCount.trim()) {
      setError('Please enter seat count');
      return;
    }
    const auditorium = {
      seatCount
    };
    updateAuditorium(audiid, auditorium)
      .then((response) => {
        console.log(response.data);
        navigator('/list-auditoriums');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className='container'>
      <br /> <br />  
      <div className='row'>
      <HeaderComponent/>
<p/> <p/> <p/>
        <div className='card col-md-6 offset-md-3 offst-md-3'>
          <h2 className='text-center'>Update Auditorium</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Auditorium seat count</label>
                <input
                  type='number'
                  placeholder='Enter Auditorium seat count'
                  name='auditorium_seat_count'
                  value={seatCount}
                  className='form-control'
                  onChange={(e) => setSeatCount(e.target.value)}
                />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Theatre Name</label>
                <input
                  type='text'
                  name='theatre_name'
                  value={theatre.name}
                  className='form-control'
                  readOnly
                />
              </div>
              {error && (
    <div className="alert alert-danger" role="alert">
        {error}
    </div>
      )}

              
              <button className='btn btn-success' onClick={putAuditorium}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAuditoriumComponent;
