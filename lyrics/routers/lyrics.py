from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.lyrics import (
    Error,
    LyricsIn,
    LyricsOut,
    LyricsQueries
)

router = APIRouter()


# Get all lyrics
@router.get("/api/lyrics", response_model=Union[List[LyricsOut], Error])
def get_all_lyrics(
    repo: LyricsQueries = Depends(),
):
    return repo.get_all()

# Get one lyrics by lyrics id
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
