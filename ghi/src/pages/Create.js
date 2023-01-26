import { useState } from "react";
import { useAuthContext } from "../authApi";
import { Navigate } from "react-router-dom";
import React from "react";

function Create() {
  const[prompt, setPrompt] = useState('');
  const[artistName, setArtistName] = useState('');
  const[songName, setSongName] = useState('');
  const[submitted, setSubmitted] = useState(false);
  const[fetching, setFetching] = useState(false);
  const { token } = useAuthContext();

    const handlePromptChange = (event) => {
        const value = event.target.value
        setPrompt(value)
    }

    const handleArtistNameChange = (event) => {
        const value = event.target.value
        setArtistName(value)
    }

    const handleSongNameChange = (event) => {
        const value = event.target.value
        setSongName(value)
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setFetching(true);
            const promptData = {
            user_input: prompt,
            artist_name: artistName,
            song_name: songName,
            };
            const lyricsURL = `http://localhost:8010/api/users/current/lyrics`;
            // const lyricsURL = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics`;
            const fetchConfig = {
                method: "POST",
                body: JSON.stringify(promptData),
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(lyricsURL, fetchConfig);
            if (!response.ok) {
            throw new Error(response.statusText);
            }
            setSubmitted(true);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    let messages = "alert alert-success d-none mb-0"

    let button = "btn btn-primary"

    let spinner = "spinner-border d-none"

    if (fetching === true) {
        button = "btn btn-primary d-none"
        spinner = "spinner-border"
    }

    if (submitted === true) {
        messages = "alert alert-success mb-0";
        spinner = "spinner-border d-none";
        return <Navigate to ="/Profile"/>
    }

  return (
    <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h3>What should AI sing about today?</h3>
                    <form onSubmit={handleSubmit} id="create-lyrics-form">
                        <div className="form-floating mb-3">
                            <input onChange={handlePromptChange} placeholder="Prompt" required
                                type="text" name="prompt" id="prompt"
                                className="form-control" />
                            <label htmlFor="prompt">Your Prompt</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleArtistNameChange} placeholder="Artist Name" required
                                type="text" name="artist-name" id="artist-name"
                                className="form-control" />
                            <label htmlFor="artist-name">Artist Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleSongNameChange} placeholder="Song Name" required
                                type="song-name" name="song-name" id="song-name"
                                className="form-control"/>
                            <label htmlFor="song-name">Song Name</label>
                        </div>
                        <button type="submit" className={button}>Send Prompt</button>
                        <div className={spinner} role="status">
                        </div>
                    </form>
                </div>
                <div className={messages} id="success-message">
                    Your prompt has been sent.

                </div>
            </div>
        </div>
  );
}

export default Create;
