import { React, useEffect, useState } from "react";

function Home() {
  const [postedLyrics, setPostedLyrics ] = useState([]);
  const [users, setUsers] = useState({});

  const getLyrics = async () => {
    const lyricsUrl = `${process.env.REACT_APP_LYRICS_API_HOST}/api/lyrics`;

    const response = await fetch(lyricsUrl)
    if (response.ok) {
      const data = await response.json();

      // Uncomment this if you don't have enough posted lyrics to work with
      // setPostedLyrics(data);

      let postedData = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].posted === true) {
          postedData.push(data[i]);
        }
      }
      setPostedLyrics(postedData);

    }
  }

  const getUsers = async () => {
    const usersUrl = `${process.env.REACT_APP_USERS_API_HOST}/api/users`;

    const response = await fetch(usersUrl);
    if (response.ok) {
      const data = await response.json();
      let dataObj = {};
      for (let i = 0; i < data.length; i++) {
        let currUser = data[i];
        let id = currUser.id;
        let username = currUser.username;
        dataObj[id] = username;
      }
      console.log("DataObj: ", dataObj);
      setUsers(dataObj);
    }
  }

  useEffect(() => {
    getLyrics();
    getUsers();
  }, [])


  return (
    <>
      <div id="heading">
          <h1>Homepage</h1>
      </div>


      <div className="lyrics-container">
        {postedLyrics.map(lyrics => {
          return (
            <div key={lyrics.id} className="card mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title">Posted by {users[lyrics.user_id]}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                {new Date(lyrics.created_at).toLocaleDateString()}
                </h6>
                <p className="card-text" style={{whiteSpace: "pre-line"}}>
                  {lyrics.user_output}
                </p>
              </div>
              <div className="card-footer">
                total likes here
              </div>
            </div>
          );
        })}
      </div>

    </>

  )
}

export default Home;
