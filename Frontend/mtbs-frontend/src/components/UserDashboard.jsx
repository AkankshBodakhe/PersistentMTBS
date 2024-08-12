import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../services/UserService';

const UserDashboard = () => {
    const items = [
        { id: 1, name: 'Profile' },
        { id: 2, name: 'View Screenings' },
        { id: 3, name: 'My Booking'},
      ];

      const [userID , setid] = useState();

      const {userName} = useParams();
      const navigator = useNavigate();

      useEffect(()=>{
        if(userName){
            getUser(userName).then((response)=>{
            setid(response.data.id);
          }).catch(error =>{
            console.error(error);
          })
        }
      },[userID])

    function handleView(name){
        if(name === "Profile"){        
            navigator(`/get-user/${userName}`);
        }
        if(name === "View Screenings"){        
            navigator(`/screening-user/${userName}`);
        }
        if(name === "My Booking"){        
            navigator(`/getbookingbyuserid/${userID}`)
        }
    }
 
  return (
    <div className='container'>
        <h2 className='text-center'>USER DASHBOARD</h2>
        <table className='table table-striped table-bordered'>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td className='text-center' style={{ fontSize: '18px', fontFamily: 'fantasy' }}>{item.name}</td>
            <td className='text-center'>
              <button className="btn btn-primary m-1" onClick={() => handleView(item.name)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
  
}

export default UserDashboard