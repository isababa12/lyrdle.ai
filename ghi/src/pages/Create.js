import { useState } from "react";
import { useAuthContext } from "../authApi";
import { Navigate } from "react-router-dom";
import React from "react";
import "../styles/css/Create.css"

function Create() {
  const [prompt, setPrompt] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songName, setSongName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { token } = useAuthContext();

  const handlePromptChange = (event) => {
    const value = event.target.value;
    setPrompt(value);
  };

  const handleArtistNameChange = (event) => {
    const value = event.target.value;
    setArtistName(value);
  };

  const handleSongNameChange = (event) => {
    const value = event.target.value;
    setSongName(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setFetching(true);
      const promptData = {
        user_input: prompt,
        artist_name: artistName,
        song_name: songName,
      };
      const lyricsURL = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics`;
      const fetchConfig = {
        method: "POST",
        body: JSON.stringify(promptData),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
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
    let createButton = "create."
    let spinner = "spinner-border d-none"
    let button = "btn btn-primary"

  if (fetching === true) {
    createButton = "creating";
    spinner = "spinner-border";
    let button = "spinner"
  }

  if (submitted === true) {
    messages = "alert alert-success mb-0";
    spinner = "spinner-border d-none";
    return <Navigate to="/profile" />;
  }

  return (
    <>
    <h1 id="create-header">What should AI sing about today?</h1>
    <div className="row">
      <div className="offset-3 col-6">
          <form onSubmit={handleSubmit} id="create-lyrics-form">
            <div className="form-floating mb-3">
              <textarea
                onChange={handlePromptChange}
                placeholder="Please write a prompt..."
                required
                name="prompt"
                id="prompt"
                className="form-control-plaintext"
              ></textarea>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleArtistNameChange}
                placeholder="Artist Name"
                required
                type="text"
                name="artist-name"
                id="artist-name"
                className="form-control-plaintext"
              />
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleSongNameChange}
                placeholder="Song Name"
                required
                type="text"
                name="song-name"
                id="song-name"
                className="form-control-plaintext"
              />
            </div>
            <div>
              <button className={button} type="submit"> Create </button>
              {/* Add button here! */}
            </div>
              <ul className="fixed-bottom bd-highlight">
                <li className="nav-item" key="login">
            <button type="submit" className={`bottom-nav btn btn-link`}>
              {createButton} <div className={spinner} role="status"/>
            </button>
            </li>
          </ul>
          </form>
        </div>
        <div className={messages} id="success-message">
          Your prompt has been sent.
        </div>
      </div>
      </>
  );
}

export default Create;
