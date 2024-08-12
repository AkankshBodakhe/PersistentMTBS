import React, { useEffect, useState } from 'react'
import { addTheatre } from '../../services/TheatreService' 
import { useNavigate } from 'react-router-dom'
import HeaderComponent from '../HeaderComponent';

const AddTheatreComponent = () => {

  const [id , setid] = useState();
  const [name , setname] = useState('');
  const navigator = useNavigate();
  const [error, setError] = useState('');
 

  function saveTheatre(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter a theatre name');
      return;
    }

    const theatre = {
        id,
        name
    }

    addTheatre(theatre).then((response) => {
      console.log(response.data);
      navigator('/list-theatre');
    }).catch(error=>{
      console.error(error);
    })
  }

  return (
    <div className='container'>
      <br /> <br />
      <HeaderComponent/>

      <div className='row m-5'>
        <div className='card col-md-6 offset-md-3 offst-md-3'>
        <h2 className='text-center'>Add Theatre</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Theatre Name</label>
                <input
                  type='text'
                  placeholder='Enter Theatre Name'
                  name='theatre_name'
                  value={name}
                  className='form-control'
                  onChange={(e) => setname(e.target.value)}
                >
                </input>

              </div>

              {error && (
                          <div className="alert alert-danger" role="alert">
                              {error}
                          </div>
                            )}

              <button className='btn btn-success' onClick={saveTheatre}>Submit</button>
            </form>
          </div>

        </div>

      </div>

    </div>
  )
}

export default AddTheatreComponent