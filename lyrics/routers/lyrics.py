from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Optional, Union
from authenticator import authenticator
import openai
import os
from queries.lyrics import (
    Error,
    LyricsIn,
    LyricsStatus,
    LyricsOut,
    LyricsCreateOut,
    LyricsQueries
)

router = APIRouter()



@router.post("/api/lyrics", response_model=Union[LyricsOut, Error])
def create_lyrics(
    input: LyricsIn,
    repo: LyricsQueries = Depends(),
):
    # GET CURRENT USER
    user_id = 1

    ai_prompt = f"This is a test prompt, including User Input: {input.user_input}, Artist Name: {input.artist_name}, Song Name: {input.song_name}"

    # INTEGRATE 3RD PARTY API HERE
    user_output = "Sample hardcoded user output"

    return repo.create(input, user_id, ai_prompt, user_output)


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

        # Define the prompt for text-davinci-003 model
        ai_prompt = f"Act as if you are {input.artist_name} and write a new song in a style similar to '{input.song_name}', based on the following story: {input.user_input}"

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
