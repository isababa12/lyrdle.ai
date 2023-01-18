from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Union
from queries.pool import pool


class LyricsIn(BaseModel):
    user_input: str
    artist_name: str
    song_name: str

class LyricsOut(BaseModel):
    id: int
    user_id: int
    user_input: str
    artist_name: str
    song_name: str
    ai_prompt: str
    user_output: str
    created_at: Optional[datetime]
    posted: Optional[bool]
    posted_at: Optional[datetime]

class LyricsCreateOut(BaseModel):
    id: int
    user_id: int
    user_input: str
    artist_name: str
    song_name: str
    ai_prompt: str
    user_output: str

class LyricsStatus(BaseModel):
    posted:bool

class Error(BaseModel):
    message: str


class LyricsQueries:

    # Create new lyrics
    def create(self,
        input: LyricsIn,
        user_id: int,
        ai_prompt: str,
        user_output: str,
    ) -> LyricsCreateOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO lyrics(
                            user_id
                            , user_input
                            , artist_name
                            , song_name
                            , ai_prompt
                            , user_output
                        )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user_id,
                            input.user_input,
                            input.artist_name,
                            input.song_name,
                            ai_prompt,
                            user_output
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = input.dict()
                    return LyricsCreateOut(
                        id=id,
                        user_id=user_id,
                        ai_prompt=ai_prompt,
                        user_output=user_output,
                        **old_data
                    )
        except Exception:
            return {"message": "create did not work"}

    # Get all lyrics
    def get_all(self, user_id: int = None) -> Union[List[LyricsOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    if user_id is None:
                        result = db.execute(
                            """
                            SELECT id
                                , user_id
                                , user_input
                                , artist_name
                                , song_name
                                , ai_prompt
                                , user_output
                                , created_at
                                , posted
                                , posted_at
                            FROM lyrics
                            ORDER BY created_at DESC;
                            """
                        )
                    else:
                        result = db.execute(
                            """
                            SELECT id
                                , user_id
                                , user_input
                                , artist_name
                                , song_name
                                , ai_prompt
                                , user_output
                                , created_at
                                , posted
                                , posted_at
                            FROM lyrics
                            WHERE user_id = %s
                            ORDER BY created_at DESC;
                            """,
                            [user_id]
                        )
                    return [
                        self.record_to_lyrics_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all lyrics"}


    # Get one lyrics (by lyrics id)
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
                            , created_at
                            , posted
                            , posted_at
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

    # Change "posted" status for one lyrics
    def update_status(self, lyrics_id: int, posted: bool) -> LyricsStatus:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE lyrics
                        SET posted = %s
                        WHERE id = %s
                        """,
                        [
                            posted,
                            lyrics_id
                        ]
                    )
                return LyricsStatus(posted=posted)
        except Exception as e:
            print(e)
            return {"message": "Unable to post Lyrics"}


    def record_to_lyrics_out(self, record):
        # print("Record: ", record)
        return LyricsOut(
            id=record[0],
            user_id=record[1],
            user_input=record[2],
            artist_name=record[3],
            song_name=record[4],
            ai_prompt=record[5],
            user_output=record[6],
            created_at=record[7],
            posted=record[8],
            posted_at=record[9]
        )
