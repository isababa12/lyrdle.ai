import heartFill from '../styles/icons/heart-filled.png'
import heart from '../styles/icons/heart.png'

function LyricsCard(props) {
  const lyrics = props.lyrics;
  const username = props.username;
  const handleSubmitAddLike = props.handleSubmitAddLike;
  const handleSubmitRemoveLike = props.handleSubmitRemoveLike;
  const likeChecker = props.likeChecker;
  const userLikes = props.userLikes;
  const token = props.token;

  // let likeButton = "btn btn-success d-none";

  // if (token) {
  //   likeButton = "btn btn-success";
  // }

  return (
    <div key={lyrics.id} className="card mb-3">
      <div className="card-header">
        <h5>{username}</h5>
        <h6>Inspired by "{lyrics.song_name}" - {lyrics.artist_name}</h6>
        <p className="card-subtitle mb-2 text-muted"> posted on{" "}
          {new Date(lyrics.posted_at).toLocaleDateString("en-US", {
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
        {likeChecker(lyrics.id) ? (
          <form
            onSubmit={(event) =>
              handleSubmitRemoveLike(event, lyrics.id, userLikes)
            }
            id="remove-like-form"
          >
            <button
              type="submit"
              id="likes-btn"
              className={`${token ? "" : "d-none"}`}
            >
              <img src={heartFill} alt="like"/>
            </button>{" "}
            {lyrics.total_likes} Likes
          </form>
        ) : (
          <form
            onSubmit={(event) => handleSubmitAddLike(event, lyrics.id)}
            id="create-like-form"
          >
            <button
              type="submit"
              id="likes-btn"
              className={`${token ? "" : "d-none"}`}
            >
              <img src={heart} alt="like"/>
            </button>{" "}
            {lyrics.total_likes} Likes
          </form>
        )}
      </div>
    </div>
  );
}

export default LyricsCard;
