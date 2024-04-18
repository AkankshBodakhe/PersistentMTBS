import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addMovie } from '../../services/MovieService';
import HeaderComponent from '../HeaderComponent';

const AddMovieComponent = () => {

  const [id , setid] = useState();
  const [title, settitle] = useState('');
  const [genre, setgenre] = useState('');
  const [duration, setduration] = useState('');
  const navigator = useNavigate();
  const [error, setError] = useState('');
  
  
  function saveMovie(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError('Please enter title');
      return;
    }
    if (!genre.trim()) {
      setError('Please enter genre');
      return;
    }
    if (!duration.trim()) {
      setError('Please enter duration');
      return; 
    }
    const movie = {
        title,
        genre,
        duration
    }

    addMovie(movie).then((response) => {
      console.log(response.data);
      navigator('/list-movie');
    }).catch(error=>{
      console.error(error);
    })
  }

  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
      <HeaderComponent/>
      <p/> <p/>
        <div className='card col-md-6 offst-md-3'>
        <h2 className='text-center'>Add Movie</h2>
          <div className='card-body'>
            <form>  
              
              <div className='form-group mb-2'>
                <label className='form-label'>Title</label>
                <input
                  type='text'
                  placeholder='Enter Title'
                  name='Title'
                  value={title}
                  className='form-control'
                  onChange={(e) => settitle(e.target.value)}
                >
                </input>

              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Genre</label>
                <input
                  type='text'
                  placeholder='Enter Genre'
                  name='Genre'
                  value={genre}
                  className='form-control'
                  onChange={(e) => setgenre(e.target.value)}
                >
                </input>

              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Duration</label>
                <input
                  type='number'
                  placeholder='Enter duration(in hrs)'
                  name='Duration'
                  value={duration}
                  className='form-control'
                  onChange={(e) => setduration(e.target.value)}
                >
                </input>

              </div>
              {error && (
    <div className="alert alert-danger" role="alert">
        {error}
    </div>
      )}
              <button className='btn btn-success' onClick={saveMovie}>Submit</button>
            </form>
          </div>

        </div>

      </div>

    </div>
  )
}

export default AddMovieComponent