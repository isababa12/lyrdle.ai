from fastapi import APIRouter, Depends, Response, HTTPException
from queries.likes.comment_likes import (
    # CommentLikeIn,
    CommentLikeOut,
    CommentLikeQueries,
    Error
)
from typing import Optional, List, Union
from authenticator import authenticator

router = APIRouter(prefix="/api")

@router.post("/users/{user_id}/lyrics/{lyrics_id}/comment_likes", response_model=Union[CommentLikeOut, Error])
def create_comment_like(
    user_id: int,
    account: dict = Depends(authenticator.try_get_current_account_data),
    lyrics_id = int,
    repo: CommentLikeQueries = Depends()
):
    if account and user_id == account["id"]:
        return repo.create(user_id, lyrics_id)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")

@router.get("/lyrics/{lyrics_id}/comment_likes", response_model=Union[Error, List[CommentLikeOut]])
def get_all(lyrics_id: int, repo: CommentLikeQueries = Depends()):
    return repo.get_all_comment_likes(lyrics_id)

@router.delete("/users/{user_id}/lyrics/{lyrics_id}/comment_likes/{comment_like_id}/", response_model=bool)
def delete_comment_like(
    comment_like_id: int,
    repo: CommentLikeQueries = Depends(),
) -> bool:
    return repo.delete(comment_like_id)

# @router.get("/{comment_like_id}", response_model=Optional[CommentLikeOut])
# def get_one_comment_like(
#     comment_like_id: int,
#     response: Response,
#     repo: CommentLikeQueries = Depends(),
# ) -> CommentLikeOut:
#     comment_like = repo.get_one_comment_like(comment_like_id)
#     if comment_like is None:
#         response.status_code = 404
#     return comment_like

# @router.put("/users/{user_id}/comments/{comment_id}/comment_likes", response_model=Union[CommentLikeOut, Error])
# def update_comment_like(
#     comment_like_id: int,
#     comment_like: CommentLikeIn,
#     repo: CommentLikeQueries = Depends(),
# ) -> Union[CommentLikeOut, Error]:
#     return repo.update(comment_like_id, comment_like)
