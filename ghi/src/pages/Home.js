import { React, useEffect, useState } from "react";
import { useAuthContext } from "../authApi";
import "./HomeProfile.css";

function Home() {
  const { token } = useAuthContext();
  const [postedLyrics, setPostedLyrics] = useState([]);
  const [usernames, setUsernames] = useState('');
  const [userLikes, setUserLikes] = useState('');
  const [likeChanged, setLikeChanged] = useState(false);

  useEffect(() => {
    getUsers();
    getPostedLyrics();
    if (token) {
      getUserLikes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, likeChanged]);

  const getPostedLyrics = async () => {
    try {
      const lyricsUrl = `${process.env.REACT_APP_LYRICS_API_HOST}/api/lyrics/posted`;
      const response = await fetch(lyricsUrl);
      if (response.ok) {
        const data = await response.json();
        setPostedLyrics(data);

      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getUsers = async () => {
    try {
      const usersUrl = `${process.env.REACT_APP_USERS_API_HOST}/api/users`;
      const response = await fetch(usersUrl);
      if (response.ok) {
        const data = await response.json();

        let usersDict = getUsernames(data);
        setUsernames(usersDict);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  function getUsernames(users) {
    let usernames = {};
    for (let i = 0; i < users.length; i++) {
      let currUser = users[i];
      let id = currUser.id;
      let username = currUser.username;
      usernames[id] = username;
    };
    return usernames;
  };

  const getUserLikes = async () => {
    try {
      const userLikesURL = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics_likes`;
      const fetchConfig = {
          method: "get",
          headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
          },
      };
      const response = await fetch(userLikesURL, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        let lyricsLiked = {};
        for (let i = 0; i < data.length; i++) {
          let currLike = data[i];
          let lyricsId = currLike["lyrics_id"];
          let likeId = currLike["id"];
          lyricsLiked[lyricsId] = likeId;
        }
        setUserLikes(lyricsLiked);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  function likeChecker(lyricsId) {
    if (userLikes[lyricsId] === undefined) {
      return false;
    } else {
      return true;
    }
  };


  function handleSubmitAddLike(event, lyricsId) {
    event.preventDefault();
    const createLikeUrl = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics/${lyricsId}/lyrics_likes`;

    const fetchConfig = {
      method: "post",
      headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
      },
    };
    fetch(createLikeUrl, fetchConfig)
      .then((response) => {
        if (!response.ok) {
          console.log("Fetch error")
        } else {
          setLikeChanged(!likeChanged);
        }
      })
      .catch(e => console.error('Create Like Error: ', e))
  }


  function handleSubmitRemoveLike(event, lyricsId, likeId) {
    event.preventDefault();
    const deleteLikeUrl = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics/${lyricsId}/lyrics_likes/${likeId}`;

    const fetchConfig = {
      method: "delete",
      headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
      },
    };
    fetch(deleteLikeUrl, fetchConfig)
      .then((response) => {
        if (!response.ok) {
          console.log("Fetch error")
        } else {
          setLikeChanged(!likeChanged);
        }
      })
      .catch(e => console.error('Delete Like Error: ', e))
  }

  let logInDependent = "btn btn-success d-none"
  let logOutDependent = "btn btn-success"

  if (token){
    logInDependent = "btn btn-success"
    logOutDependent = "btn btn-success d-none"
  }

  return (
    <>
    <div id="homepage-container">
      <div id="heading">
        <h1>Homepage</h1>
      </div>
      <div className="row row-cols-3">
        {postedLyrics.map((lyrics) => {
          return (
            <div key={lyrics.id} className="card mb-3 shadow ">
              <div className="card-header">
                <h5>{usernames[lyrics.user_id]}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  posted on {new Date(lyrics.posted_at).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                </h6>
              </div>
              <div className="card-body">
                  <div id="module" className="card-text">
                  <p className="collapse" id="collapseExample" aria-expanded="false" style={{ whiteSpace: "pre-line" }}>
                    {lyrics.user_output}
                  </p>
                  <a role="button" className="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Show </a>
                </div>
              </div>
              <div className="card-footer">
                  {(likeChecker(lyrics.id))
                  ?
                  <form onSubmit={(event) => handleSubmitRemoveLike(event, lyrics.id, userLikes[lyrics.id])} id="remove-like-form">
                    <button type="submit" className="btn btn-secondary" id="lyrics-btn">Unlike</button> {lyrics.total_likes} Likes
                  </form>
                  :
                  <form onSubmit={(event) => handleSubmitAddLike(event, lyrics.id)} id="create-like-form">
                    <button type="submit" id="lyrics-btn" className={logInDependent}>Like</button> {lyrics.total_likes} Likes
                  </form>
                  }
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}
export default Home;
