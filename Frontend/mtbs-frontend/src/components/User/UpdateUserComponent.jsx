import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { getUser , getUserbyID, updateUser} from '../../services/UserService';
const UpdateUserComponent = () => {

    const [id , setid] = useState();
    const [userName , setuserName] = useState();
    const [password , setpassword] = useState();

    const navigator = useNavigate();

    const {userID} = useParams();

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

      function putUser(e) {
        e.preventDefault();
        
        const user = {id,userName,password}
        updateUser(id, user).then((response) =>{
        console.log(response.data);
        navigator(`/get-user/${id}`);
      }).catch(error => {
        console.error(error);
      })
    }
  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offst-md-3'>
        <h2 className='text-center'>Update User</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>User Name</label>
                <input
                  type='text'
                  placeholder='Enter user name'
                  name='user_name'
                  value={userName}
                  className='form-control'
                  onChange={(e) => setuserName(e.target.value)}
                >
                </input>
                </div>
              
              <div className='form-group mb-2'>
                <label className='form-label'>Set Password</label>
                <input
                  type='text'
                  placeholder='Enter password'
                  name='user_password'
                  value={password}
                  className='form-control'
                  onChange={(e) => setpassword(e.target.value)}
                >
                </input>
                </div>

              <button className='btn btn-success' onClick={putUser}>Submit</button>
            </form>
          </div>

        </div>

      </div>


    </div>
  )
}

export default UpdateUserComponent