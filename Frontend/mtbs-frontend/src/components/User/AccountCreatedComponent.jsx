import React from 'react'
import {useNavigate} from 'react-router-dom'

const AccountCreatedComponent = () => {

    const navigator = useNavigate();
    const navigateToLoginScreen=()=>{
        navigator('/login-screen')
      }
      
    
      return(
    <div style={styles.container}>
      <h2 style={styles.heading}>Account Created Successfully</h2>
      <p style={styles.message}>Thank You!!</p>
      <button onClick={navigateToLoginScreen} style={styles.button}>Go to Login Screen</button>
    </div>
  )
  
}
const styles = {
    container: {
      textAlign: 'center',
      marginTop: '100px',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    message: {
      fontSize: '18px',
      marginBottom: '30px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
}

export default AccountCreatedComponent