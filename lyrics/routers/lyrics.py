from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.lyrics import (
    Error,
    LyricsIn,
    LyricsPosted,
    LyricsOut,
    LyricsQueries
)

router = APIRouter()



@router.post("/api/lyrics", response_model=Union[LyricsOut, Error])
def create_lyrics(
    input: LyricsIn,
    repo: LyricsQueries = Depends(),
):
    # GET CURRENT USER
    user_id = 0

    ai_prompt = f"This is a test prompt, including User Input: {input.user_input}, Artist Name: {input.artist_name}, Song Name: {input.song_name}"

    # INTEGRATE 3RD PARTY API HERE
    user_output = "Sample hardcoded user output"

    return repo.create(input, user_id, ai_prompt, user_output)


@router.get("/api/lyrics", response_model=Union[List[LyricsOut], Error])
def get_all_lyrics(
    repo: LyricsQueries = Depends(),
):
    return repo.get_all()


@router.get("/api/lyrics/{lyrics_id}", response_model=Optional[LyricsOut])
def get_one_lyrics_by_id(
    lyrics_id: int,
    response: Response,
    repo: LyricsQueries = Depends(),
) -> LyricsOut:
    lyrics = repo.get_one(lyrics_id)
    if lyrics is None:
        response.status_code = 404
    return lyrics

@router.put("/api/lyrics/{lyrics_id}", response_model=Union[LyricsPosted, Error])
def update_posted(
    lyrics_id: int,
    posted: bool,
    repo: LyricsQueries = Depends(),
) -> LyricsOut:
    return repo.update_posted(lyrics_id, posted)

# # Get all lyrics for a specific user (for profile page)
# # PLACEHOLDER - Need to implement auth
# @router.get("/api/users/{user_id}/lyrics", response_model=Union[List[LyricsOut], Error])
# def get_all_lyrics(
#     user_id: int,
#     repo: LyricsQueries = Depends(),
#     account: dict = Depends(get_current_user)
# ):
#     if account:
#         return repo.get_all(user_id)
