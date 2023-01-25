import { React, useEffect, useState } from "react";
import axios from "axios";

// const axios = require("axios").default;

// const api = axios.create({
//   baseURL: `http://localhost:8010`,
// });

function Profile() {
  const [postedLyrics, setPostedLyrics] = useState([]);
  const [users, setUsers] = useState([]);

  // const getLyrics = () => {
  //   axios
  //     .get(`http://localhost:8010/api/lyrics`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setPostedLyrics(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getLyrics = async () => {
    try {
      const response = await axios.get("http://localhost:8010/api/users/current");
      setPostedLyrics(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // async function GetLyrics() {
  //   // const lyricsUrl = `http://localhost:8010/api/lyrics`;
  //   try {
  //     const response = await api.get(`api/lyrics`);
  //     setPostedLyrics(response.data);
  //     console.log(response);
  //     console.log(`The data is: ${response.data.lyrics}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // Uncomment this if you don't have enough posted lyrics to work with
  // setPostedLyrics(data);

  //   let postedData = [];
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].posted === true) {
  //       postedData.push(data[i]);
  //     }
  //   }
  //   setPostedLyrics(postedData);
  // };

  // const getLyrics = async () => {
  //   const lyricsUrl = `${process.env.REACT_APP_LYRICS_API_HOST}/api/lyrics`;

  //   // const response = await fetch(lyricsUrl)
  //   // if (response.ok) {
  //   //   const data = await response.json();
  //   try {
  //     const response = await Axios.get(lyricsUrl)
  //     console.log(response.data)
  //     console.log(response)
  //     console.log(data)

  //   } catch (error) {
  //     console.log(error)
  //   }

  //     // Uncomment this if you don't have enough posted lyrics to work with
  //     // setPostedLyrics(data);

  //     let postedData = [];
  //     for (let i = 0; i < data.length; i++) {
  //       if (data[i].posted === true) {
  //         postedData.push(data[i]);
  //       }
  //     }
  //     setPostedLyrics(postedData);

  //   }

  // const getUsers = async () => {
  //   const usersUrl = `${process.env.REACT_APP_USERS_API_HOST}/api/users`;

  //   const response = await fetch(usersUrl);
  //   if (response.ok) {
  //     const data = await response.json();
  //     let dataObj = {};
  //     for (let i = 0; i < data.length; i++) {
  //       let currUser = data[i];
  //       let id = currUser.id;
  //       let username = currUser.username;
  //       dataObj[id] = username;
  //     }
  //     console.log("DataObj: ", dataObj);
  //     setUsers(dataObj);
  //   }
  // };

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/current");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getUsers = () => {
  //   axios
  //     .get(`http://localhost:8000/api/users`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setUsers(response.data.username);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    getLyrics();
    getUsers();
  }, []);

  return (
    <>
      <div id="heading">
        <h1>Homepage</h1>
      </div>
      <h1>PROFILE</h1>

      <div className="lyrics-container">
        {postedLyrics.map((lyrics) => {
          return (
            <div key={lyrics.id} className="card mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title">
                  Posted by {users[lyrics.user_id]}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {new Date(lyrics.created_at).toLocaleDateString()}
                </h6>
                <p className="card-text" style={{ whiteSpace: "pre-line" }}>
                  {lyrics.user_output}
                </p>
              </div>
              <div className="card-footer">total likes here</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Profile;
