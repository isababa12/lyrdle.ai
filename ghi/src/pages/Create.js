import { useState } from "react";
import { useAuthContext } from "../authApi";
import { Navigate } from "react-router-dom";
import React from "react";
import "../styles/css/Create.css";

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
        setFetching(false);
        throw new Error(response.statusText);
      }
      setSubmitted(true);
    } catch (error) {
      console.error("Error: ", error);
      setFetching(false);
    }
  };

  let messages = "alert alert-success d-none mb-0";
  let button = "fancy-button";
  let spinner = "spinner-border d-none";
  let visibility = "d-none";

  if (fetching === true) {
    button = "fancy-button d-none";
    spinner = "spinner-border";
    visibility = "visible";
  }

  if (submitted === true) {
    messages = "alert alert-success mb-0";
    spinner = "spinner-border d-none";
    visibility = "d-none";
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <div id="create-container">
        <h1 id="create-title">create.</h1>
        <h2 id="create-header">What should lyrdle sing about today?</h2>
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
            <input
              onChange={handleArtistNameChange}
              placeholder="artist name"
              required
              type="text"
              name="artist-name:"
              id="artist-name"
              className="form-control-plaintext"
            />
            <input
              onChange={handleSongNameChange}
              placeholder="song name"
              required
              type="text"
              name="song-name"
              id="song-name"
              className="form-control-plaintext"
            />
          </div>
          <div id="send-prompt-btn-container">
            <button type="submit" id="send-prompt-btn" className={button}>
              send to AI
            </button>
          </div>
        </form>
        <ul className="fixed-bottom bd-highlight">
          <li
            key="login"
            className={`nav-link ${visibility} bottom-nav`}
            id={`bottom-nav btn btn-link`}
          >
            creating
            <div className={spinner} role="status" />
          </li>
        </ul>
        <div id="push-up">bump</div>
        <div className={messages} id="success-message">
          Your prompt has been sent.
        </div>
      </div>
    </>
  );
}

export default Create;
