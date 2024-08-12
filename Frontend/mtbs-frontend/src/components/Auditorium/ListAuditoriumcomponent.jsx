import React, {useEffect, useState} from 'react'
import { listAuditorium,deleteAuditorium } from '../../services/AuditoriumService'
import { useNavigate } from 'react-router-dom'
import HeaderComponent from '../HeaderComponent'

const ListAuditoriumcomponent = () => {

    const [auditorium, setAuditorium] = useState([])

    const navigator = useNavigate();

    useEffect(()=> {
        getAllAuditiorium();
    }, [])

    function getAllAuditiorium(){
        listAuditorium().then((response)=>{
            setAuditorium(response.data); 
         }).catch(error => {
             console.error(error);
         })
    }

    function addNewAuditorium(){
        navigator('/add-auditorium')
    }


    function updateAuditorium(id){
        navigator(`/update-auditorium/${id}`)
    }

    function removeAuditorium(id){
        console.log(id);
        //navigator(`/delete-auditorium/${id}`)

        deleteAuditorium(id).then((response)=>{
            getAllAuditiorium();
        }).catch(error => {
            console.error(error);
        })
    }
  return (
    <div className='container'>
        <h2 className='text-center'>AUDITORIUM LIST</h2>
        <HeaderComponent/>
        <p/><p/>
        <button className='btn btn-primary mb-6' onClick={addNewAuditorium}>Add Auditorium</button>
        <table className='table table-striped table-bordered m-2'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Seat Count</th>
                    <th>Auditorium Name</th>
                    <th>Theatre ID</th>
                    <th>Theatre Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
        auditorium.map(audi =>
            <tr key= {audi.id}>
                <td>{audi.id}</td>
                <td>{audi.seatCount}</td>
                <td>{audi.auditoriumName}</td>
                <td>{audi.theatre.id}</td>
                <td>{audi.theatre.name}</td>
                <td>
                    <button className='btn btn-info m-2' onClick={() => updateAuditorium(audi.id)}>Update</button>
                    <button className='btn btn-danger' onClick={() => removeAuditorium(audi.id)}>Delete</button>
                </td>
            </tr>
            )
    }
            </tbody>
        </table>
        
    </div>
    )
}

export default ListAuditoriumcomponent