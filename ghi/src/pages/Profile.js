import { React, useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../authApi";

function Profile() {
  const { token } = useAuthContext();
  const [userLyrics, setUserLyrics] = useState([]);
  const [userInfo, setUserInfo] = useState('');
  const [postedStatuses, setPostedStatuses] = useState('');

  useEffect(() => {

    if (token) {
      getUserInfo();
      getLyrics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  const getUserInfo = useCallback(async() => {
    try {
      const userURL = `http://localhost:8000/api/users/current`;
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
        setUserInfo(data);
      }
    } catch (error) {
      console.log("Error", error.response.data);
    }
  }, [token]);


  const getLyrics = async () => {
    try {
      const lyricsUrl = `http://localhost:8010/api/users/current/lyrics`;
      const fetchConfig = {
          method: "get",
          headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
          },
      };
      const response = await fetch(lyricsUrl, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setUserLyrics(data);
        let statuses = {};
        for (let i = 0; i < data.length; i++) {
          let currLyrics = data[i];
          let lyricsId = currLyrics["id"];
          statuses[lyricsId] = currLyrics["posted"];
        }
        setPostedStatuses(statuses);
        // console.log(statuses);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  function postedChecker(lyricsId) {
    if (postedStatuses[lyricsId] === false) {
      return false;
    } else {
      return true;
    }
  };


  return (
    <>
    <div id="homepage-container">
      <div id="heading">
        <h1>{userInfo.username} | My Lyrics | </h1>
      </div>
      <div className="row row-cols-3">
        {userLyrics.map((lyrics) => {
          return (
            <div key={lyrics.id} className="card mb-3 shadow ">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">
                  Created on {new Date(lyrics.created_at).toLocaleDateString()}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  {lyrics.total_likes} Likes
                </h6>
                  <div id="module" className="card-text">
                  <p className="collapse" id="collapseExample" aria-expanded="false" style={{ whiteSpace: "pre-line" }}>
                    {lyrics.user_output}
                  </p>
                  <a role="button" className="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Show </a>
                </div>
              </div>
              <div className="card-footer">
                {(postedChecker(lyrics.id)) ? <p>Posted to Homepage</p> : <p>Currently Hidden</p>}
                {(postedChecker(lyrics.id)) ? <button type="submit" className="btn btn-secondary" id="lyrics-btn">Remove Post</button> : <button type="submit" id="lyrics-btn"   className="btn btn-primary">Post to Homepage</button>}
                <button type="submit" className="btn btn-danger" id="lyrics-btn">Delete Lyrics</button>
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
