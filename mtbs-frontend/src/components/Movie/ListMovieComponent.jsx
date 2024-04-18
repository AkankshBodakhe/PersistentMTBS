import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteMovie, listMovie } from '../../services/MovieService'
import HeaderComponent from '../HeaderComponent'

const ListMovieComponent = () => {

    const [movie, setMovie] = useState([])

    const navigator = useNavigate();

    useEffect(()=> {
        getAllMovie();
    }, [])

    function getAllMovie(){
        listMovie().then((response)=>{
            setMovie(response.data); 
         }).catch(error => {
             console.error(error);
         })
    }

    function addNewMovie(){
        navigator('/add-movie')
    }


    function updateMovie(id){
        navigator(`/update-movie/${id}`)
    }

    function removeMovie(id){
        console.log(id);
        //navigator(`/delete-auditorium/${id}`)

        deleteMovie(id).then((response)=>{
            getAllMovie();
        }).catch(error => {
            console.error(error);
        })
    }
  return (
    <div className='container'>
        <HeaderComponent/>
        <p/> <p/>
        <h2 className='text-center'>MOVIE LIST</h2>
        <button className='btn btn-primary mb-2' onClick={addNewMovie}>Add Movie</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Duration(in hours)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
        movie.map(mov =>
            <tr key= {mov.id}>
                <td>{mov.id}</td>
                <td>{mov.title}</td>
                <td>{mov.genre}</td>
                <td>{mov.duration}</td>
                <td>
                    <button className='btn btn-info m-2' onClick={() => updateMovie(mov.id)}>Update</button>
                    <button className='btn btn-danger' onClick={() => removeMovie(mov.id)}>Delete</button>
                </td>
            </tr>
            )
    }
            </tbody>
        </table>
        
    </div>
    )
}

export default ListMovieComponent