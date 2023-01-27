function LyricsCard(props) {
  const lyrics = props.lyrics;
  const username = props.username;
  const handleSubmitAddLike = props.handleSubmitAddLike;
  const handleSubmitRemoveLike = props.handleSubmitRemoveLike;
  const likeChecker = props.likeChecker;
  const userLikes = props.userLikes;
  const logInDependent = props.logInDependent;
  // const heart = require("../styles/icons/heart.svg");
  // const heartFill = require("../styles/icons/heartFill.svg");

  return (
    <div key={lyrics.id} className="card mb-3">
      <div className="card-header">
        <h5>{username}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          posted on{" "}
          {new Date(lyrics.posted_at).toLocaleDateString("en-US", {
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
        {likeChecker(lyrics.id) ? (
          <form
            onSubmit={(event) =>
              handleSubmitRemoveLike(event, lyrics.id, userLikes)
            }
            id="remove-like-form"
          >
            <button type="submit" className="btn btn-secondary" id="lyrics-btn">
              Unlike
            </button>{" "}
            {lyrics.total_likes} Likes
          </form>
        ) : (
          <form
            onSubmit={(event) => handleSubmitAddLike(event, lyrics.id)}
            id="create-like-form"
          >
            <button type="submit" id="lyrics-btn" className={logInDependent}>
              Like
            </button>{" "}
            {lyrics.total_likes} Likes
          </form>
        )}
      </div>
    </div>
  );
}

export default LyricsCard;
