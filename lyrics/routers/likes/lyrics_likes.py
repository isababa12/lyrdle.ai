from fastapi import APIRouter, Depends, Response, HTTPException
from queries.likes.lyrics_likes import (
    # LyricsLikeIn,
    LyricsLikeOut,
    LyricsLikeQueries,
    Error
)
from typing import Optional, List, Union
from authenticator import authenticator

router = APIRouter(prefix="/api")

@router.post("/users/{user_id}/lyrics/{lyrics_id}/lyrics_likes", response_model=Union[LyricsLikeOut, Error])
def create_lyrics_like(
    user_id: int,
    account: dict = Depends(authenticator.try_get_current_account_data),
    lyrics_id = int,
    repo: LyricsLikeQueries = Depends()
):
    if account and user_id == account["id"]:
        print("successful")
        return repo.create(user_id, lyrics_id)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")

@router.get("/lyrics/{lyrics_id}/lyrics_likes", response_model=Union[Error, List[LyricsLikeOut]])
def get_all(lyrics_id: int, repo: LyricsLikeQueries = Depends()):
    return repo.get_all_lyrics_likes(lyrics_id)

@router.delete("/users/{user_id}/lyrics/{lyrics_id}/lyrics_likes/{lyrics_like_id}/", response_model=bool)
def delete_lyrics_like(
    lyrics_like_id: int,
    repo: LyricsLikeQueries = Depends(),
) -> bool:
    return repo.delete(lyrics_like_id)

# @router.get("/{lyrics_like_id}", response_model=Optional[LyricsLikeOut])
# def get_one_lyrics_like(
#     lyrics_like_id: int,
#     response: Response,
#     repo: LyricsLikeQueries = Depends(),
# ) -> LyricsLikeOut:
#     lyrics_like = repo.get_one_lyrics_like(lyrics_like_id)
#     if lyrics_like is None:
#         response.status_code = 404
#     return lyrics_like

# @router.put("/users/{user_id}/lyricss/{lyrics_id}/lyrics_likes", response_model=Union[LyricsLikeOut, Error])
# def update_lyrics_like(
#     lyrics_like_id: int,
#     lyrics_like: LyricsLikeIn,
#     repo: LyricsLikeQueries = Depends(),
# ) -> Union[LyricsLikeOut, Error]:
#     return repo.update(lyrics_like_id, lyrics_like)
