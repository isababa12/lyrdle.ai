from fastapi import APIRouter, Depends, HTTPException
from queries.likes.lyrics_likes import LyricsLikeOut, LyricsLikeQueries, Error
from typing import List, Union
from authenticator import authenticator


router = APIRouter(prefix="/api")


# PUBLIC - GET ALL LYRICS LIKES
@router.get(
    "/lyrics_likes",
    response_model=Union[Error, List[LyricsLikeOut]],
)
def get_all_lyrics_likes(repo: LyricsLikeQueries = Depends()):
    print("calling get all function")
    return repo.get_all()


# PUBLIC - GET ALL LIKES FOR A LYRICS POST
@router.get(
    "/lyrics/{lyrics_id}/lyrics_likes",
    response_model=Union[Error, List[LyricsLikeOut]],
)
def get_lyrics_likes(lyrics_id: int, repo: LyricsLikeQueries = Depends()):
    return repo.get_all(lyrics_id)


# LOGIN REQUIRED - GET CURRENT USERS'S LIKES
@router.get(
    "/users/current/lyrics_likes",
    response_model=Union[Error, List[LyricsLikeOut]],
)
def get_current_user_lyrics_likes(
    account: dict = Depends(authenticator.get_current_account_data),
    repo: LyricsLikeQueries = Depends(),
):
    if account:
        user_id = account["id"]
        return repo.get_all_user(user_id)


# LOGIN REQUIRED - LIKE A LYRICS POST (CREATE)
@router.post(
    "/users/current/lyrics/{lyrics_id}/lyrics_likes",
    response_model=Union[Error, LyricsLikeOut],
)
def create_lyrics_like(
    # user_id: int,
    account: dict = Depends(authenticator.try_get_current_account_data),
    lyrics_id=int,
    repo: LyricsLikeQueries = Depends(),
):
    if account:
        user_id = account["id"]
        return repo.create(user_id, lyrics_id)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


# LOGIN REQUIRED - REMOVE LIKE FROM LYRICS POST (DELETE)
@router.delete(
    "/users/current/lyrics/{lyrics_id}/lyrics_likes/{lyrics_like_id}",
    response_model=Union[Error, bool],
)
def delete_lyrics_like(
    lyrics_like_id: int,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: LyricsLikeQueries = Depends(),
) -> bool:
    if account:
        return repo.delete(lyrics_like_id)
