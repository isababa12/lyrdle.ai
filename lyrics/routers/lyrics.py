from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Optional, Union
from authenticator import authenticator
from queries.lyrics import (
    Error,
    LyricsIn,
    LyricsStatus,
    LyricsOut,
    LyricsCreateOut,
    LyricsQueries
)

router = APIRouter()

# PUBLIC - ALL LYRICS
@router.get("/api/lyrics", response_model=Union[List[LyricsOut], Error])
def get_all_lyrics(
    repo: LyricsQueries = Depends(),
):
    return repo.get_all()

# PUBLIC - ONE LYRIC
@router.get("/api/lyrics/{lyrics_id}", response_model=Optional[LyricsOut])
def get_one_lyrics(
    lyrics_id: int,
    response: Response,
    repo: LyricsQueries = Depends(),
) -> LyricsOut:
    lyrics = repo.get_one(lyrics_id)
    if lyrics is None:
        response.status_code = 404
    return lyrics


# LOGIN REQUIRED - CREATE LYRICS
@router.post("/api/users/{user_id}/lyrics", response_model=Union[LyricsCreateOut, Error])
def create_lyrics_user_id(
    user_id: int,
    input: LyricsIn,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: LyricsQueries = Depends(),
):
    if account and user_id == account["id"]:

        # Create the AI prompt
        ai_prompt = f"Act as if you are {input.artist_name} and write a new song in a style similar to '{input.song_name}', based on the following story: {input.user_input}"

        # Use 3rd party API to generate the output
        user_output = "Sample AI-generated user output"

        # Call the 'create' queries method
        return repo.create(input, user_id, ai_prompt, user_output)

    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


# LOGIN REQUIRED - ALL USER'S LYRICS
@router.get("/api/users/{user_id}/lyrics", response_model=Union[List[LyricsOut], Error])
def get_all_lyrics_user_id(
    user_id: int,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: LyricsQueries = Depends(),
):
    # print("Account: ", account)
    if account and user_id == account["id"]:
        return repo.get_all(user_id)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


# LOGIN REQUIRED - UPDATE LYRICS POSTED STATUS
@router.put("/api/users/{user_id}/lyrics/{lyrics_id}", response_model=Union[LyricsStatus, Error])
def update_lyrics_posted_status(
    user_id: int,
    lyrics_id: int,
    posted: bool,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: LyricsQueries = Depends(),
) -> LyricsOut:
    if account and user_id == account["id"]:
        return repo.update_status(lyrics_id, posted)
