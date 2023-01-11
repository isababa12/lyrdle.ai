from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from queries.pool import pool


class LyricsIn(BaseModel):
    user_id: int
    user_input: str
    artist_name: Optional[str]
    song_name: Optional[str]
    ai_prompt: str
    user_output: str

class LyricsOut(BaseModel):
    id: int
    user_id: int
    user_input: str
    ai_prompt: str
    artist_name: str
    song_name: str
    user_output: str
    posted: bool
    created_at: datetime
    posted_at: datetime

class LyricsListOut(BaseModel):
    lyrics_list: list[LyricsOut]


class LyricsQueries: pass
    # def create

    # def get_all

    # def get_one

    # def update

    # def delete
