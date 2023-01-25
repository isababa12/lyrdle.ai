import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../authApi";
import React from 'react';

function Settings() {
    // const [userInfo, setUserInfo] = useState('');
    const { token } = useAuthContext();
    const [submitted, setSubmitted] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const getUserInfo = useCallback(async() => {
        const userURL = `http://localhost:8000/api/users/current`
        const fetchConfig = {
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
        };
        const response = await fetch(userURL, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            // setUserInfo(data);
            setEmail(data.email);
            setUsername(data.username);
            setPassword('');
        }
    }, [token])

    useEffect(() => {
        if (token){
            getUserInfo();
        }
    }, [token, getUserInfo]);
    // commenting so I can commit - delete later

    const handleNewEmailChange = (event) => {
        const value = event.target.value
        setEmail(value)
    }

    const handleNewUsernameChange = (event) => {
        const value = event.target.value
        setUsername(value)
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value
        setPassword(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        getUserInfo();
        const userData = {
            "email": email,
            "username": username,
            "password": password,
        }
        const userURL = 'http://localhost:8000/api/users/current'
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(userData),
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(userURL, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            // setUserInfo(data);
            setEmail(data.email);
            setUsername(data.username);
            setPassword('');
            // ADDED THIS
            setSubmitted(true);
        }
    }

    let messages = "alert alert-success d-none mb-0"

    if (submitted === true) {
        messages = "alert alert-success mb-0"
    }
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Hello, {username}</h1>
                    <form onSubmit={handleSubmit} id="update-user-info-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNewEmailChange} placeholder="New Email" required
                                type="text" name="new-email" id="new-email"
                                className="form-control" value={email} />
                            <label htmlFor="new-email">New Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleNewUsernameChange} placeholder="New Username" required
                                type="text" name="new-username" id="new-username"
                                className="form-control" value={username}/>
                            <label htmlFor="new-username">New Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePasswordChange} placeholder="New Password" required
                                type="password" name="password" id="password"
                                className="form-control" value={password}/>
                            <label htmlFor="new-password">New password</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Apply Changes</button>
                    </form>
                </div>
                <div className={messages} id="success-message">
                    Your account info has been updated.
                </div>
            </div>
        </div>
    );
}

export default Settings;
