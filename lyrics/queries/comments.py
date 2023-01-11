from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from queries.pool import pool


class CommentIn(BaseModel):
    comment_content: str
    user_id: int
    lyrics_id: int

class CommentOut(BaseModel):
    id: int
    comment_content: str
    user_id: int
    lyrics_id: int
    created_at: datetime
    modified_at: Optional[datetime]

class CommentsOut(BaseModel):
    comments: list[CommentOut]


class CommentQueries: pass
    # def create

    # def get_all

    # def get_one

    # def update

    # def delete
