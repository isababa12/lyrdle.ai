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
    total_likes: Optional[int]


class LyricsCreateOut(BaseModel):
    id: int
    user_id: int
    user_input: str
    artist_name: str
    song_name: str
    ai_prompt: str
    user_output: str


class LyricsPostedOut(BaseModel):
    id: int
    user_id: int
    artist_name: str
    song_name: str
    user_output: str
    created_at: Optional[datetime]
    posted: bool
    total_likes: Optional[int]
    posted_at: Optional[datetime]


class LyricsUpdateOut(BaseModel):
    id: int
    posted: bool


class Error(BaseModel):
    message: str


class LyricsQueries:

    # Create new lyrics
    def create(
        self,
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
                            user_output,
                        ],
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
                with conn.cursor() as cur:
                    if user_id is None:
                        result = cur.execute(
                            """
                            SELECT lyrics.id
                                , lyrics.user_id
                                , lyrics.user_input
                                , lyrics.artist_name
                                , lyrics.song_name
                                , lyrics.ai_prompt
                                , lyrics.user_output
                                , lyrics.created_at
                                , lyrics.posted
                                , lyrics.posted_at
                                , COUNT(lyrics_likes) AS total_likes
                            FROM lyrics
                            LEFT OUTER JOIN lyrics_likes
                            ON (lyrics.id = lyrics_likes.lyrics_id)
                            GROUP BY lyrics.id
                            ORDER BY created_at DESC;
                            """
                        )
                    else:
                        result = cur.execute(
                            """
                            SELECT lyrics.id
                                , lyrics.user_id
                                , lyrics.user_input
                                , lyrics.artist_name
                                , lyrics.song_name
                                , lyrics.ai_prompt
                                , lyrics.user_output
                                , lyrics.created_at
                                , lyrics.posted
                                , lyrics.posted_at
                                , COUNT(lyrics_likes) AS total_likes
                            FROM lyrics
                            LEFT OUTER JOIN lyrics_likes
                            ON (lyrics.id = lyrics_likes.lyrics_id)
                            WHERE lyrics.user_id = %s
                            GROUP BY lyrics.id
                            ORDER BY created_at DESC;
                            """,
                            [user_id],
                        )
                    return [
                        self.record_to_lyrics_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all lyrics"}

    def get_all_posted(self) -> Union[Error, List[LyricsPostedOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT lyrics.id
                        , lyrics.user_id
                        , lyrics.created_at
                        , lyrics.posted
                        , lyrics.artist_name
                        , lyrics.song_name
                        , lyrics.user_output
                        , COUNT(lyrics_likes) AS total_likes
                        , lyrics.posted_at
                        FROM lyrics
                        LEFT OUTER JOIN lyrics_likes
                        ON (lyrics.id = lyrics_likes.lyrics_id)
                        WHERE lyrics.posted = true
                        GROUP BY lyrics.id
                        ORDER BY posted_at DESC;
                        """
                    )
                    return [
                        self.record_to_lyrics_posted_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get posted lyrics"}

    # Get one lyrics (by lyrics id)
    def get_one(self, lyrics_id: int) -> Optional[LyricsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
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
                        [lyrics_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        print("No records available.")
                        return None
                    else:
                        return self.record_to_lyrics_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that lyrics item"}

    # Change "posted" status for one lyrics
    def update_status(self, lyrics_id: int, posted: bool) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE lyrics
                        SET posted = %s, posted_at = CURRENT_TIMESTAMP
                        WHERE id = %s
                        """,
                        [posted, lyrics_id],
                    )
                    updated_row_count = cur.rowcount
                    if updated_row_count > 0:
                        print("Updated rows: ", updated_row_count)
                        return True
                    else:
                        print("Nothing to update.")
                        return False
        except Exception as e:
            print(e)
            return False

    def delete(self, lyrics_id: int) -> Union[Error, bool]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM lyrics
                        WHERE id = %s
                        """,
                        [lyrics_id],
                    )
                    deleted_row_count = db.rowcount
                    if deleted_row_count > 0:
                        print("Delete successful.")
                        return True
                    else:
                        print("Nothing to delete.")
                        return False
        except Exception as e:
            print(e)
            return Error(message="Could not delete lyrics")

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
            posted_at=record[9],
            total_likes=record[10]
        )

    def record_to_lyrics_posted_out(self, record):
        return LyricsPostedOut(
            id=record[0],
            user_id=record[1],
            created_at=record[2],
            posted=record[3],
            artist_name=record[4],
            song_name=record[5],
            user_output=record[6],
            total_likes=record[7],
            posted_at=record[8]
        )
