import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { getTheatre, updateTheatre } from '../../services/TheatreService'
import { getMovie, updateMovie } from '../../services/MovieService';
import HeaderComponent from '../HeaderComponent';

const UpdateMovieComponent = () => {

    const [id , setid] = useState();
    const [title, settitle] = useState('');
    const [genre, setgenre] = useState('');
    const [duration, setduration] = useState('');
    const [error, setError] = useState('');


    const navigator = useNavigate();

    const {movieid} = useParams();

    useEffect(()=>{
        if(movieid){
            getMovie(movieid).then((response)=>{
            setid(response.data.id);
            settitle(response.data.title);
            setgenre(response.data.genre);
            setduration(response.data.duration);
          }).catch(error =>{
            console.error(error);
          })
        }
      },[id])

      function putMovie(e) {
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
        
        const movie = {id,title,genre,duration}

        updateMovie(movieid, movie).then((response) =>{
        console.log(response.data);
        navigator('/list-movie');
      }).catch(error => {
        console.error(error);
      })
    }
  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
      <HeaderComponent/>
      <p/> <p/>
        <div className='card col-md-6 offset-md-3 offst-md-3'>
        <h2 className='text-center'>Update Movie</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Movie ID</label>
                <input
                  type='number'
                  placeholder='This value will get generated automatically'
                  name='movie_id'
                  value={id}
                  className='form-control'
                  onChange={(e) => setid(e.target.value)}
                  readOnly
                >
                </input>

              </div>
              
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
                  placeholder='Enter duration'
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
    </div>)}

              <button className='btn btn-success' onClick={putMovie}>Submit</button>
            </form>
          </div>

        </div>

      </div>

    </div>
  )
}

export default UpdateMovieComponent