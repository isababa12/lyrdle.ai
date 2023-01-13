from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Union
from queries.pool import pool


class LyricsIn(BaseModel):
    user_id: int
    user_input: str
    artist_name: str
    song_name: str
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
    # posted: bool
    # created_at: datetime
    # posted_at: Optional[datetime]

class Error(BaseModel):
    message: str


class LyricsQueries:
    # def create

    # Get all
    def get_all(self) -> Union[List[LyricsOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , user_id
                            , user_input
                            , artist_name
                            , song_name
                            , ai_prompt
                            , user_output
                            , posted
                            , created_at
                        FROM lyrics
                        ORDER BY created_at DESC;
                        """
                    )
                    return [
                        self.record_to_lyrics_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all lyrics"}


    # Get one (by lyrics id)
    def get_one(self, lyrics_id: int) -> Optional[LyricsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , user_id
                            , user_input
                            , artist_name
                            , song_name
                            , ai_prompt
                            , user_output
                            , posted
                            , created_at
                        FROM lyrics
                        WHERE id = %s
                        """,
                        [lyrics_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_lyrics_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that lyrics item"}

    # def update

    # def delete

    # helper function - record to lyrics out
    def record_to_lyrics_out(self, record):
        return LyricsOut(
            id=record[0],
            user_id=record[1],
            user_input=record[2],
            ai_prompt=record[3],
            artist_name=record[4],
            song_name=record[5],
            user_output=record[6],
            posted=record[7],
            created_at=record[8]
        )
