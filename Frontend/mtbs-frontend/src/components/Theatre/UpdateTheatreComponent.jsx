import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { getTheatre, updateTheatre } from '../../services/TheatreService'
import HeaderComponent from '../HeaderComponent';

const UpdateTheatreComponent = () => {

    const [id , setid] = useState();
    const [name , setname] = useState();

    const navigator = useNavigate();

    const {theatreid} = useParams();
    const [error, setError] = useState('');
  
  
    useEffect(()=>{
        if(theatreid){
            getTheatre(theatreid).then((response)=>{
            setid(response.data.id);
            setname(response.data.name);
          }).catch(error =>{
            console.error(error);
          })
        }
      },[id])

      function putTheatre(e) {
        e.preventDefault();

        if (!name.trim()) {
          setError('Please enter a theatre name');
          return;
        }
        
        const theatre = {id,name}
        updateTheatre(theatreid, theatre).then((response) =>{
        console.log(response.data);
        navigator('/list-theatre');
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
        <h2 className='text-center'>Update Theatre</h2>
          <div className='card-body'>
            <form>
            {/* <div className='form-group mb-2'>
                <label className='form-label'>Theatre id</label>
                <input
                  type='text'
                  placeholder='Enter Theatre id'
                  name='Theatre_id'
                  value={id}
                  className='form-control'
                  onChange={(e) => setid(e.target.value)}
                  readOnly
                >
                </input>

              </div> */}
              <div className='form-group mb-2'>
                <label className='form-label'>Theatre Name</label>
                <input
                  type='text'
                  placeholder='Enter theatre name'
                  name='Theatre_name'
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


              <button className='btn btn-success' onClick={putTheatre}>Submit</button>
            </form>
          </div>

        </div>

      </div>


    </div>
  )
}

export default UpdateTheatreComponent