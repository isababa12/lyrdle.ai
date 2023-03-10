from fastapi import APIRouter, Depends, HTTPException
from queries.comments import CommentOut, CommentQueries, Error
from typing import List, Union
from authenticator import authenticator


router = APIRouter(prefix="/api")


@router.get(
    "/lyrics/{lyrics_id}/comments",
    response_model=Union[Error, List[CommentOut]],
)
def get_comments(lyrics_id: int, repo: CommentQueries = Depends()):
    return repo.get_all(lyrics_id)


@router.post(
    "/users/current/lyrics/{lyrics_id}/comments",
    response_model=Union[Error, CommentOut],
)
def create_comment(
    lyrics_id: int,
    comment_content: str,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: CommentQueries = Depends(),
):
    if account:
        user_id = account["id"]
        return repo.create(user_id, lyrics_id, comment_content)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.put(
    "/users/current/lyrics/{lyrics_id}/comments/{comment_id}",
    response_model=bool,
)
def update_comment(
    comment_id: int,
    new_content: str,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: CommentQueries = Depends(),
) -> CommentOut:
    if account:
        return repo.update(comment_id, new_content)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.delete(
    "/users/current/lyrics/{lyrics_id}/comments/{comment_id}",
    response_model=Union[Error, bool],
)
def delete_comment(
    comment_id: int,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: CommentQueries = Depends(),
) -> bool:
    if account:
        return repo.delete(comment_id)
