import React from 'react'
import { getUser, getUserbyID } from '../../services/UserService';
import { useState ,useEffect} from 'react';
import { useNavigate , useParams} from 'react-router-dom';

const GetUserComponent = () => {

    const [id , setid] = useState();
    const [Name , setuserName] = useState();
    const [password , setpassword] = useState();


    const {userID} = useParams();

    const navigator = useNavigate();

    useEffect(()=>{
        if(userID){
            getUserbyID(userID).then((response)=>{
            setid(response.data.id);
            setuserName(response.data.userName);
            setpassword(response.data.password);
          }).catch(error =>{
            console.error(error);
          })
        }
      },[id])
      console.log(id);

    function updateuser(id){
        navigator(`/update-user/${id}`)
    }
  return (
    <div>
      <h2 className='text-center'>User Data</h2>
      <table className='table table-striped table-bordered'>       
       <thead>
          <tr>
            <th className='text-center' style={{ width: '5%' }}>ID</th>
            <th className='text-center' style={{ width: '5%' }}>Username</th>
            <th className='text-center' style={{ width: '5%' }}>Password</th>
            <th className='text-center' style={{ width: '5%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td className='text-center'>{id}</td>
              <td className='text-center'>{Name}</td>
              <td className='text-center'>{password}</td>
              <td>
              <button className='btn btn-info m-lg-1' onClick={() => updateuser(id)}>Update</button>
              </td>
              </tr>
        </tbody>
      </table>
    </div>
  )
}

export default GetUserComponent
