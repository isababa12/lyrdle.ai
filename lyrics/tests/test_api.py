from queries.lyrics import LyricsOut, LyricsQueries, LyricsCreateOut, LyricsIn
from queries.likes.lyrics_likes import LyricsLikeOut, LyricsLikeQueries
from pydantic import BaseModel
from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator

# fake_token = "faketoken"

lyrics_in = LyricsIn(
    user_input = "I've never once held someone's hand : (",
    artist_name = "DJ Idiot Guy",
    song_name = "Pump it up like a little dummy"
)

lyrics_out = LyricsOut(
    id = 1,
    user_id = 1,
    user_input = "I've never once held someone's hand : (",
    artist_name = "DJ Idiot Guy",
    song_name = "Pump it up like a little dummy",
    ai_prompt = "Do a cool pump it up in the style of PUMP IT by PUMPER",
    user_output = "There was once a guy who pumped it up, pumped it up, p-p-p-pumped it up",
    posted = False
)

# user_out = UserOut(
#     id = 1,
#     email = "j@butts.biz",
#     username = "buttboy",
#     hashed_password = "AFSIUFncoxicjaiofsah"
# )
# class FakeUser(BaseModel):
#     id = 1
#     email = "j@butts.biz"
#     username = "buttboy"
#     hashed_password = "AFSIUFncoxicjaiofsah"

# fake_user = {
#     "id": 1,
#     "email": "j@butts.biz",
#     "username": "buttboy",
#     "hashed_password": "AFSIUFncoxicjaiofsah"
# }

# def getFakeUser():
#     return ("id", 1, "email", "j@butts.biz", "username", "buttboy", "hashed_password", "ahshdhj454523452342").dict()

# lyrics_create_out = LyricsCreateOut(
#     id = 1,
#     user_id = 1,
#     user_input = "I've never once held someone's hand : (",
#     artist_name = "DJ Idiot Guy",
#     song_name = "Pump it up like a little dummy",
#     ai_prompt = "Do a cool pump it up in the style of PUMP IT by PUMPER",
#     user_output = "There was once a guy who pumped it up, pumped it up, p-p-p-pumped it up"
# )

lyrics_likes_out = LyricsLikeOut(
    id = 1,
    user_id = 1,
    lyrics_id = 1
)

client = TestClient(app)

class MockLyricsRepo:

    def get_all(self):
        return [lyrics_out]

    def get_one(self, lyrics_id):
        if lyrics_id:
            print("lyrics id===", lyrics_id)
            return lyrics_out
        else:
            print("lyrics not id")
            return [lyrics_out]

    # def create(self):
    #     return lyrics_create_out

class MockLyricsLikesRepo:
    def get_all(self):
        return [lyrics_likes_out]

def test_get_all_lyrics():
    app.dependency_overrides[LyricsQueries] = MockLyricsRepo
    response = client.get("/api/lyrics")
    assert response.status_code == 200
    assert response.json() == [lyrics_out.dict()]

def test_get_a_lyric():
    app.dependency_overrides[LyricsQueries] = MockLyricsRepo
    print("Hello : )")
    lyric_id = 1
    response = client.get(f"/api/lyrics/{lyric_id}")
    assert response.status_code == 200
    assert response.json() == lyrics_out.dict()

# def test_create_lyrics():
#     app.dependency_overrides[authenticator.get_current_account_data] = getFakeUser()
#     app.dependency_overrides[LyricsQueries] = MockLyricsRepo
#     response = client.post(
#         "/api/users/current/lyrics",
#         headers = {"X-Token": fake_token},
#         json = {
#             "input": "blah",
#             "user_id": 1,
#             "ai_prompt": "blah",
#             "user_output": "hello"
#         })
#     assert response.status_code == 200
#     assert response.json() == lyrics_create_out.dict()

def test_lyric_likes():
    app.dependency_overrides[LyricsLikeQueries] = MockLyricsLikesRepo
    response = client.get("/api/lyrics/1/lyrics_likes/")
    assert response.status_code == 200
    assert response.json() == [lyrics_likes_out.dict()]
