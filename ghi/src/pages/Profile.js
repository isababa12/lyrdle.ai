import { React, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../authApi";
import "../styles/css/HomeProfile.css";

function Profile() {
  const { token } = useAuthContext();
  const [userLyrics, setUserLyrics] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [statusChanged, setStatusChanged] = useState(false);

  useEffect(() => {
    if (token) {
      getUserInfo();
      getLyrics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, statusChanged]);

  const getUserInfo = useCallback(async () => {
    try {
      const userURL = `${process.env.REACT_APP_USERS_API_HOST}/api/users/current`;
      const fetchConfig = {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(userURL, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      }
    } catch (error) {
      console.log("Error", error.response.data);
    }
  }, [token]);

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
            <a id="hell">account settings</a>
          </Link>
        </div>
        <div id="profile-grid"></div>
        <div className="row row-cols-3">
          {userLyrics.map((lyrics) => {
            return (
              <div key={lyrics.id} className="card mb-3 shadow ">
                <div className="card-header">
                  <h6
                    id="profile-card-subtitle"
                    className="card-subtitle mb-2 text-muted"
                  >
                    Created on{" "}
                    {new Date(lyrics.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h6>
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
                        className="btn btn-secondary"
                        id="lyrics-btn"
                      >
                        Make Private
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
                        className="btn btn-primary"
                        id="lyrics-btn"
                      >
                        Share to Homepage
                      </button>{" "}
                      {lyrics.total_likes} Likes
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Profile;
