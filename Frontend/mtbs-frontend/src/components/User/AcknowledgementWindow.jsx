import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AcknowledgementWindow = () => {
  const navigator = useNavigate();

  const {userID} = useParams();

  const navigateToMyBookings = () => {
    navigator(`/getbookingbyuserid/${userID}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Booking Successful</h2>
      <p style={styles.message}>Thank You!!</p>
      <button onClick={navigateToMyBookings} style={styles.button}>Go to my bookings</button>
    </div>
  );
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
};

export default AcknowledgementWindow;
