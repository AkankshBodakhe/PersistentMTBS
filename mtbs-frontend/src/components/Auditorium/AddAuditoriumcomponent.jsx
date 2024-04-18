import React, { useEffect, useState } from 'react'
import { addAuditorium} from '../../services/AuditoriumService'
import { useNavigate } from 'react-router-dom'
import { listTheatre } from '../../services/TheatreService'
import HeaderComponent from '../HeaderComponent'

const AddAuditoriumcomponent = () => {

  const [theatre,settheatre] = useState([])
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [seatCount , setSeatCount] = useState('');
  const [auditoriumName , setAuditoriumName] = useState('');
  const navigator = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    listTheatre()
      .then(response => {
        settheatre(response.data);
      })
      .catch(error => {
        console.error('Error fetching theatres:', error);
      });
  }, []);

  const handleTheatreChange = (e) => {
    setSelectedTheatre(e.target.value);
  };

  function saveAuditorium(e) {
    e.preventDefault();
    if (!seatCount.trim()) {
    setError('Please enter seat count');
    return;
  }
  if (!auditoriumName.trim()) {
    setError('Please enter auditorium  name');
    return;
  }
    const auditorium = {
      seatCount,
      auditoriumName,
      theatre: {
        id: selectedTheatre
      }
    }
    addAuditorium(auditorium).then((response) => {
      console.log(response.data);
      navigator('/list-auditoriums');
    }).catch(error=>{
      console.error(error);
    })
  }
  
  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
      <HeaderComponent/>
      <p/> <p/> <p/>
        <div className='card col-md-6 offset-md-3 offst-md-3'>
        <h2 className='text-center'>Add Auditorium</h2>
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
                >
                </input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Auditorium Name</label>
                <input
                  type='text'
                  placeholder='Enter Auditorium name'
                  name='auditorium_name'
                  value={auditoriumName}
                  className='form-control'
                  onChange={(e) => setAuditoriumName(e.target.value)}
                >
                </input>

              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Select Theatre</label>
                <select
                  className='form-control'
                  value={selectedTheatre}
                  onChange={handleTheatreChange}
                >
                  <option value=''>Select Theatre</option>
                  {theatre.map(theatre => (
                    <option key={theatre.id} value={theatre.id}>
                      {theatre.name}
                    </option>
                  ))}
                </select>
              </div>
              {error && (
    <div className="alert alert-danger" role="alert">
        {error}
    </div>
      )}
              <button className='btn btn-success' onClick={saveAuditorium}>Submit</button>
            </form>
          </div>

        </div>

      </div>


    </div>
  )
}

export default AddAuditoriumcomponent

