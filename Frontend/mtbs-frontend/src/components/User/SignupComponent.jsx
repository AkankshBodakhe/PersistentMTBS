import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser, checkUsernameExists } from '../../services/UserService';

const SignupComponent = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigator = useNavigate();

    async function checkUser() {
        try {
            const response = await checkUsernameExists(userName);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function addUserHandler(e) {
        e.preventDefault();

        if (!userName.trim()) {
            setError('Please enter a username');
            return;
        }

        if (!password.trim()) {
            setError('Please enter a password');
            return;
        }

        try {
            const userExists = await checkUser();
            if (userExists) {
                setError('User name already exists');
            } else {
                const user = {
                    userName,
                    password
                };

                const response = await addUser(user);
                console.log(response.data);
                navigator('/acc-created-ack');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">
            <br />
            <br />
            <div className="row ">
                <div className="card col-md-6   ">
                    <h2 className="text-center">Sign Up</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="user_ID" className="form-label">
                                    User name
                                </label>
                                <input
                                    type="text"
                                    id="user_name"
                                    placeholder="Enter User name"
                                    name="user_name"
                                    value={userName}
                                    className="form-control"
                                    onChange={e => setUserName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={password}
                                    className="form-control"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <div className="d-grid">
                                <button type="button" className="btn btn-primary btn-lg" onClick={addUserHandler}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupComponent;
