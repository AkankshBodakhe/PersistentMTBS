import React, {useEffect, useState} from 'react'
import { deleteTheatre, listTheatre, updateTheatre } from '../../services/TheatreService'
import { useNavigate } from 'react-router-dom'
import HeaderComponent from '../HeaderComponent'

const ListTheatreComponent = () => {

    const [theatre, settheatre] = useState([])

    const navigator = useNavigate();

    useEffect(()=> {
        getAllTheatre();
    }, [])

    function getAllTheatre(){
        listTheatre().then((response)=>{
            settheatre(response.data); 
         }).catch(error => {
             console.error(error);
         })
    }

    function addNewTheatre(){
        navigator('/add-theatre');
    }

    function updateTheatre(id){
        navigator(`/update-theatre/${id}`)
    }

    function removeTheatre(id){
        console.log(id);
        //navigator(`/delete-auditorium/${id}`)

        deleteTheatre(id).then((response)=>{
            getAllTheatre();
        }).catch(error => {
            console.error(error);
        })
    }



  return (
    <div className='container'>
        <h2 className='text-center'>THEATRE LIST</h2>
        <HeaderComponent/>
        <button className='btn btn-primary m-2' onClick={addNewTheatre}>Add Theatre</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Theatre ID</th>
                    <th>Theatre Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
            theatre.map(tht =>
            <tr key= {tht.id}>
                <td>{tht.id}</td>
                <td>{tht.name}</td>
                <td>
                    <button className='btn btn-info m-lg-1' onClick={() => updateTheatre(tht.id)}>Update</button>
                    <button className='btn btn-danger m-lg-1' onClick={() => removeTheatre(tht.id)}>Delete</button>
                </td>
            </tr>
            )
    }
            </tbody>
        </table>
        
    </div>
    )
}

export default ListTheatreComponent