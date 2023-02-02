import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../authApi";
import hide from '../styles/icons/bxs-hide-grey.png'
import show from '../styles/icons/bxs-show.png'
import "../styles/css/HomeProfile.css";

function Profile() {
  const { token } = useAuthContext();
  const [userLyrics, setUserLyrics] = useState([]);
  const [statusChanged, setStatusChanged] = useState(false);

  useEffect(() => {
    if (token) {
      getLyrics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, statusChanged]);

  const getLyrics = async () => {
    try {
      const lyricsUrl = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics`;

      const fetchConfig = {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(lyricsUrl, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setUserLyrics(data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  function handleSubmitStatus(event, lyricsId, status) {
    event.preventDefault();
    const newStatus = !status;
    const updateLyricsUrl = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics/${lyricsId}?posted=${newStatus}`;

    const fetchConfig = {
      method: "put",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    fetch(updateLyricsUrl, fetchConfig)
      .then((response) => {
        if (!response.ok) {
          console.log("Fetch error");
        } else {
          setStatusChanged(!statusChanged);
        }
      })
      .catch((e) => console.error("Update lyrics error: ", e));
  }

  return (
    <>
      <div id="profile-page-container">
        <div id="profile-title">
          <h1 id="profile-heading">Your Collection</h1>
          <Link to="/settings" id="profile-settings-link">
            <p id="settings-link-text">account settings</p>
          </Link>
        </div>
        <div id="profile-grid"></div>
        <div className="row row-cols-3">
          {userLyrics.map((lyrics) => {
            return (
              <div key={lyrics.id} className="card mb-3 ">
                <div className="card-header">
                  <br/>
                  <h6>Inspired by "{lyrics.song_name}" - {lyrics.artist_name}</h6>
                  <p
                    id="profile-card-subtitle"
                    className="card-subtitle mb-2 text-muted"
                  >
                    created on{" "}
                    {new Date(lyrics.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="card-body">
                  <div id="module" className="card-text">
                    <p
                      className="collapse"
                      id="collapseExample"
                      aria-expanded="false"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {lyrics.user_output}
                    </p>
                    <a
                      role="button"
                      className="collapsed"
                      data-toggle="collapse"
                      href="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Show{" "}
                    </a>
                  </div>
                </div>
                <div className="card-footer">
                  {lyrics.posted ? (
                    <form
                      onSubmit={(event) =>
                        handleSubmitStatus(event, lyrics.id, lyrics.posted)
                      }
                      id="remove-like-form"
                    >
                      <button
                        type="submit"
                        id="share-btn"
                      >
                        <img src={show} alt="show"/>
                      </button>{" "}
                      {lyrics.total_likes} Likes
                    </form>
                  ) : (
                    <form
                      onSubmit={(event) =>
                        handleSubmitStatus(event, lyrics.id, lyrics.posted)
                      }
                      id="remove-like-form"
                    >
                      <button
                        type="submit"
                        id="share-btn"
                      >
                        <img src={hide} alt="hide"/>
                      </button>{" "}
                      {lyrics.total_likes} Likes
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      <div id="push-up">Bump</div>
      </div>
    </>
  );
}

export default Profile;
