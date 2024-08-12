import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderComponent from './HeaderComponent';

const AdminDashboard = () => {
    const items = [
        { id: 1, name: 'Theatre' },
        { id: 2, name: 'Auditorium' },
        { id: 3, name: 'Movie'},
        { id: 4, name: 'Screening'},
        { id: 5, name: 'Booking Details'}
        
      ];

    const navigator = useNavigate();

    function handleView(name){
        if(name === "Auditorium"){        
            navigator('/list-auditoriums');
        }
        if(name === "Theatre"){        
            navigator('/list-theatre');
        }
        if(name === "Movie"){        
            navigator('/list-movie');
        }
        if(name === "Screening"){        
          navigator('/list-screening');
      }
        if(name === "Booking Details"){        
            navigator('/list-booking');
        }
        
    }
  return (
    
    <div className='container'>
        <h2 className='text-center'>ADMIN DASHBOARD</h2>
        <table className='table table-striped table-bordered'>
      <thead >
        <tr>
          <th className='text-center' style={{ width: '5%' }}>Databases</th>
          <th className='text-center' style={{ width: '5%' }}>View DB</th>
        </tr>
      </thead>
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

export default AdminDashboard