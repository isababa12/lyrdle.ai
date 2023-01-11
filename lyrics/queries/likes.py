from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from queries.pool import pool


class LikeIn(BaseModel):
    user_id: int
    lyrics_id: Optional[int]
    comment_id: Optional[int]

class LikeOut(BaseModel):
    id: int
    user_id: int
    lyrics_id: Optional[int]
    comment_id: Optional[int]
    created_at: datetime

class LikesOut(BaseModel):
    likes: list[LikeOut]


class LikeQueries: pass
    # def create

    # def get_all

    # def get_one

    # def update

    # def delete
