import { React, useEffect, useState } from "react";
import { useAuthContext } from "../authApi";
import "../styles/css/HomeProfile.css";
import LyricsCard from "../components/LyricsCard";

function Home() {
  const { token } = useAuthContext();
  const [postedLyrics, setPostedLyrics] = useState([]);
  const [usernames, setUsernames] = useState("");
  const [userLikes, setUserLikes] = useState("");
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
    }
    return usernames;
  }

  const getUserLikes = async () => {
    try {
      const userLikesURL = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics_likes`;
      const fetchConfig = {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
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
  }

  function handleSubmitAddLike(event, lyricsId) {
    event.preventDefault();
    const createLikeUrl = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics/${lyricsId}/lyrics_likes`;

    const fetchConfig = {
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    fetch(createLikeUrl, fetchConfig)
      .then((response) => {
        if (!response.ok) {
          console.log("Fetch error");
        } else {
          setLikeChanged(!likeChanged);
        }
      })
      .catch((e) => console.error("Create Like Error: ", e));
  }

  function handleSubmitRemoveLike(event, lyricsId, likeId) {
    event.preventDefault();
    const deleteLikeUrl = `${process.env.REACT_APP_LYRICS_API_HOST}/api/users/current/lyrics/${lyricsId}/lyrics_likes/${likeId}`;

    const fetchConfig = {
      method: "delete",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    fetch(deleteLikeUrl, fetchConfig)
      .then((response) => {
        if (!response.ok) {
          console.log("Fetch error");
        } else {
          setLikeChanged(!likeChanged);
        }
      })
      .catch((e) => console.error("Delete Like Error: ", e));
  }

  function buildLyricsCard(lyrics) {
    return (
      <LyricsCard
        key={lyrics.id}
        lyrics={lyrics}
        username={usernames[lyrics.id]}
        handleSubmitAddLike={handleSubmitAddLike}
        handleSubmitRemoveLike={handleSubmitRemoveLike}
        likeChecker={likeChecker}
        userLikes={userLikes[lyrics.id]}
        logInDependent={logInDependent}
      />
    );
  }

  let remainingLyrics = [];
  let featuredLyric = null;
  if (postedLyrics.length > 0) {
    featuredLyric = postedLyrics.reduce(function (obj1, obj2) {
      return obj1.total_likes > obj2.total_likes ? obj1 : obj2;
    });
    remainingLyrics = postedLyrics.filter((value) => featuredLyric !== value);
  }

  let logInDependent = "btn btn-success d-none";

  if (token) {
    logInDependent = "btn btn-success";
  }

  return (
    <>
      <div id="homepage-container">
        <div id="home-layout">
          <div id="logo-container">
            <h1 id="logo-heading">lyrdle ai</h1>
          </div>
          <div id="featured-post">
            {featuredLyric && buildLyricsCard(featuredLyric)}
          </div>
        </div>
        <div id="arrow">
          <img alt="arrow" src={require("../images/custom-arrow.png")} />
        </div>
        <div className="fixed-bottom bd-highlight">
          <h2 id="create-heading">
            <a href="/login"> create.</a>
          </h2>
        </div>
        <div className="d-flex flex-wrap justify-content-start flex-2-column bd-highlight">
          {remainingLyrics.map((lyrics) => {
            return buildLyricsCard(lyrics);
          })}
        </div>
        <div id="push-up">Test</div>
      </div>
    </>
  );
}
export default Home;
