from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Optional, Union
from authenticator import authenticator
import openai
import os
from queries.lyrics import (
    Error,
    LyricsIn,
    LyricsOut,
    LyricsCreateOut,
    LyricsQueries
)


router = APIRouter(prefix="/api")


# PUBLIC - ALL LYRICS
@router.get("/lyrics", response_model=Union[List[LyricsOut], Error])
def get_all_lyrics(
    repo: LyricsQueries = Depends(),
):
    print(repo.get_all())
    return repo.get_all()


# PUBLIC - ONE LYRIC
@router.get("/lyrics/{lyrics_id}", response_model=Optional[LyricsOut])
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
@router.post("/users/current/lyrics", response_model=Union[LyricsCreateOut, Error])
def create_lyrics(
    # user_id: int,
    input: LyricsIn,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: LyricsQueries = Depends(),
):
    if account:
        # Get user id
        user_id = account["id"]

        # Define the prompt for text-davinci-003 model
        ai_prompt = f"Act as if you are the music artist '{input.artist_name}' and write a new song in a style similar to '{input.song_name}', based on the following story: {input.user_input}"

        # Set up the OpenAI API client
        openai.api_key = os.environ["OPEN_AI_KEY"]

        # use openai.Completion.create method
        response = openai.Completion.create(model="text-davinci-003", prompt=ai_prompt, max_tokens=300, temperature=0)

        # Extract generated text from API response and clean up
        generated_text = response["choices"][0]["text"]
        print("GENERATED TEXT: ", generated_text)

        # Use 3rd party API to generate the output
        user_output = generated_text

        # Call the 'create' queries method
        return repo.create(input, user_id, ai_prompt, user_output)

    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


# LOGIN REQUIRED - ALL USER'S LYRICS
@router.get("/users/current/lyrics", response_model=Union[List[LyricsOut], Error])
def get_all_user_lyrics(
    # user_id: int,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: LyricsQueries = Depends(),
):
    if account:
        user_id = account["id"]
        return repo.get_all(user_id)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


# LOGIN REQUIRED - UPDATE LYRICS POSTED STATUS
@router.put("/users/current/lyrics/{lyrics_id}", response_model=bool)
def update_lyrics_posted_status(
    # user_id: int,
    lyrics_id: int,
    posted: bool,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: LyricsQueries = Depends(),
) -> LyricsOut:
    if account:
        return repo.update_status(lyrics_id, posted)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


# LOGIN REQUIRED - DELETE LYRICS
@router.delete("/users/current/lyrics/{lyrics_id}", response_model=Union[Error, bool])
def delete_lyrics(
    lyrics_id: int,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: LyricsQueries = Depends(),
) -> bool:
    if account:
        return repo.delete(lyrics_id)
