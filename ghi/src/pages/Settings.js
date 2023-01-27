import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../authApi";
import React from 'react';

function Settings() {
    const { token } = useAuthContext();
    const [submitted, setSubmitted] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [deleteAttempt, setDeleteAttempt] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const getUserInfo = async() => {
        const userURL = `${process.env.REACT_APP_USERS_API_HOST}/api/users/current`
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
            setEmail(data.email);
            setUsername(data.username);
            setPassword('');
        }
    };

    useEffect(() => {
        if (token){
            getUserInfo();
        }
    }, [token]);


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
        const userURL = `${process.env.REACT_APP_USERS_API_HOST}/api/users/current`
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

            setEmail(data.email);
            setUsername(data.username);
            setPassword('');
            setSubmitted(true);
        }
    }

    const handleDeleteAttempt = async (event) => {
        event.preventDefault();
        setDeleteAttempt(true);
    }

    const handleDelete = async (event) => {
        event.preventDefault();

        const lyricsURL = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics`
        const lyrcsFetchConfig = {
            method: "delete",
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
            },
        }
        const lyricsResponse = await fetch(lyricsURL, lyrcsFetchConfig);
        if (lyricsResponse.ok) {

            const likesURL = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics_likes`
            const likesFetchConfig = {
                method: "delete",
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json',
                },
            }
            const likesResponse = await fetch(likesURL, likesFetchConfig);
            if (likesResponse.ok) {

                const userURL = `${process.env.REACT_APP_USERS_API_HOST}/api/users/current`
                const userFetchConfig = {
                    method: "delete",
                    headers: {
                        Authorization: "Bearer " + token,
                        'Content-Type': 'application/json',
                    },
                }
                const userResponse = await fetch(userURL, userFetchConfig);
                if (userResponse.ok) {
                    setDeleted(true);
                }
            }
        }
    }

    let messages = "alert alert-success d-none mb-0"

    if (submitted === true) {
        messages = "alert alert-success mb-0"
    }

    let deleteButton = "btn btn-danger d-none"

    if (deleteAttempt === true){
        deleteButton = "btn btn-danger"
    }

    if (deleted === true){
        return <Navigate to ="/logout"/>
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
                            <input onChange={handlePasswordChange} placeholder="New Password"
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
                <br/>
                <div>
                    <button type="button" className="btn btn-danger" onClick={handleDeleteAttempt} id="delete-current-user">Delete Account</button>
                </div>
                <div>
                    <button type="button" className={deleteButton} onClick={handleDelete} id="delete-current-user">Are you sure?</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
