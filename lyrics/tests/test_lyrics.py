from queries.lyrics import LyricsOut, LyricsQueries, LyricsIn
from queries.likes.lyrics_likes import LyricsLikeOut, LyricsLikeQueries
from fastapi.testclient import TestClient
from main import app


lyrics_in = LyricsIn(
    user_input="I've never once held someone's hand : (",
    artist_name="DJ Idiot Guy",
    song_name="Pump it up like a little dummy"
)

lyrics_out = LyricsOut(
    id=1,
    user_id=1,
    user_input="I've never once held someone's hand : (",
    artist_name="DJ Idiot Guy",
    song_name="Pump it up like a little dummy",
    ai_prompt="Do a cool pump it up in the style of PUMP IT by PUMPER",
    user_output="There was once a guy who pumped it up, pumped it up, p-p-p-pumped it up",
    posted=False
)

lyrics_likes_out = LyricsLikeOut(
    id=1,
    user_id=1,
    lyrics_id=1
)

client = TestClient(app)


class MockLyricsRepo:
    def get_all(self):
        return [lyrics_out]

    def get_one(self, lyrics_id):
        return lyrics_out


class MockLyricsLikesRepo:
    def get_all(self, lyrics_id=None):
        return [lyrics_likes_out]


def test_get_all_lyrics():
    app.dependency_overrides[LyricsQueries] = MockLyricsRepo
    response = client.get("/api/lyrics")
    assert response.status_code == 200
    assert response.json() == [lyrics_out.dict()]


def test_get_a_lyric():
    app.dependency_overrides[LyricsQueries] = MockLyricsRepo
    lyric_id = 1
    response = client.get(f"/api/lyrics/{lyric_id}")
    assert response.status_code == 200
    assert response.json() == lyrics_out.dict()


def test_get_all_lyrics_likes():
    app.dependency_overrides[LyricsLikeQueries] = MockLyricsLikesRepo
    response = client.get("/api/lyrics_likes")
    assert response.status_code == 200
    assert response.json() == [lyrics_likes_out.dict()]


def test_get_current_lyric_lyrics_likes():
    app.dependency_overrides[LyricsLikeQueries] = MockLyricsLikesRepo
    lyrics_id = 1
    response = client.get(f"/api/lyrics/{lyrics_id}/lyrics_likes")
    assert response.status_code == 200
    assert response.json() == [lyrics_likes_out.dict()]
