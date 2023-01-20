from fastapi import APIRouter, Depends, HTTPException
from queries.likes.comment_likes import (
    CommentLikeOut,
    CommentLikeQueries,
    Error
)
from typing import List, Union
from authenticator import authenticator


router = APIRouter(prefix="/api")


# PUBLIC - GET ALL LIKES FOR A COMMENT
@router.get("/lyrics/{lyrics_id}/comments/{comment_id}/comment_likes", response_model=Union[Error, List[CommentLikeOut]])
def get_comment_likes(
    comment_id: int,
    repo: CommentLikeQueries = Depends()
):
    return repo.get_all(comment_id)


# LOGIN REQUIRED - LIKE A COMMENT (CREATE)
@router.post("/users/current/lyrics/{lyrics_id}/comments/{comment_id}/comment_likes", response_model=Union[Error, CommentLikeOut])
def create_comment_like(
    # user_id: int,
    account: dict = Depends(authenticator.try_get_current_account_data),
    comment_id = int,
    repo: CommentLikeQueries = Depends()
):
    if account:
        user_id = account["id"]
        return repo.create(user_id, comment_id)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


# LOGIN REQUIRED - REMOVE LIKE FROM COMMENT (DELETE)
@router.delete("/users/current/lyrics/{lyrics_id}/comments/{comment_id}/comment_likes/{comment_like_id}", response_model=Union[Error, bool])
def delete_comment_like(
    comment_like_id: int,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: CommentLikeQueries = Depends(),
) -> bool:
    if account:
        return repo.delete(comment_like_id)
