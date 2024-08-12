import React, { useState, useEffect } from 'react';
import { getUser } from '../services/UserService';
import { useNavigate } from 'react-router-dom'


const LoginScreenComponent = () => {
  const navigator = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'

  const [error, setError] = useState('');



  const handleLogin = () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
  }

  if (!password.trim()) {
      setError('Please enter a password');
      return;
  }
    if (username && password) {
      // Fetch user data from the API
      getUser(username)
        .then((response) => {
          const userData = response.data;
          if (userData.password === password) {
            // Passwords match
            if (role === 'admin' && userData.admin) {
              // Admin login
              console.log('Admin login successful');
              navigator('/admin-dashboard'); // Navigate to the admin dashboard or any other route
            } else if (role === 'user' && !userData.admin) {
              // User login
              console.log('User login successful');
              navigator(`/user-dashboard/${userData.id}`); // Navigate to the user dashboard or any other route
            } else {
              // Invalid role
              setError('Invalid role selection');
            }
          } else {
            setError('Invalid Password');
            return;   
          }
        })
        .catch((error) => {
          // Handle errors, such as user not found
          console.error('Error logging in:', error);
          setError('User name not found');
        });
    } else {
      console.log('Please enter both user ID and password');
    }
  };

  const handleSignup=()=>{
    navigator('/signup')
  }

  return (
    <div class='container'>
    <br /><br />
    <div class='row '>
        <div class='card col-md-6   '>
            <h2 class='text-center'>Login</h2>
            <div class='card-body'>
                <form>
                    <div class='form-group mb-3'>
                        <label for='user_ID' class='form-label'>User name</label>
                        <input
                            type='text'
                            id='user_ID'
                            placeholder='Enter User name'
                            name='user_ID'
                            value={username}
                            class='form-control'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div class='form-group mb-3'>
                        <label for='password' class='form-label'>Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter password'
                            name='password'
                            value={password}
                            class='form-control'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div class='form-group mb-3'>
                        <label for='role' class='form-label'>Role:</label>
                        <select id='role' value={role} onChange={(e) => setRole(e.target.value)} class='form-select'>
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>
                    {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                    <div class='d-grid'>
                        <button type="button" class="btn btn-primary btn-lg" onClick={handleLogin}>Login</button>
                    </div>
                    <h5 class="m-2">Don't have account??</h5>
                    <button type="button" class="btn btn-secondary btn-lg m-md-2" onClick={handleSignup}>Create account</button>

                    <div>
                      
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
 )}

export default LoginScreenComponent;
