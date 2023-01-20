from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from queries.pool import pool
from fastapi import APIRouter, Depends, Response

class LyricsLikeIn(BaseModel):
    user_id: int
    lyrics_id: int

class LyricsLikeOut(BaseModel):
    id: int
    user_id: int
    lyrics_id: int
    created_at: Optional[datetime]

# class LyricsLikesOut(BaseModel):
#     lyrics_likes: list[LyricsLikeOut]

class Error(BaseModel):
    message: str


class LyricsLikeQueries:

    def create(self, user_id: int, lyrics_id: int) -> LyricsLikeOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO lyrics_likes
                            (user_id, lyrics_id)
                        VALUES
                            (%s, %s)
                        RETURNING id
                        """,
                        [
                            user_id,
                            lyrics_id,
                        ]
                    )
                    print(result)
                    id = result.fetchone()[0]
                    print(id)
                    return LyricsLikeOut(id=id, user_id=user_id, lyrics_id=lyrics_id)
        except Exception:
            return {"message": "Could not create lyrics like."}


    def get_all_lyrics_likes(self, lyrics_id) -> Union[List[LyricsLikeOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , user_id
                            , lyrics_id
                            , created_at
                        FROM lyrics_likes
                        WHERE lyrics_id = %s
                        ORDER BY created_at DESC;
                        """,
                        [
                            lyrics_id
                        ]
                    )
                    return [
                        self.record_to_lyrics_likes_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            {"message": "Couldn't get list of lyrics likes"}


    def delete(self, lyrics_like_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM lyrics_likes
                        WHERE id = %s
                        """,
                        [lyrics_like_id]
                    )
                    deleted_row_count = db.rowcount
                    if deleted_row_count > 0:
                        return True
                    else:
                        return False
        except Error as e:
            print(e)
            return False


    def record_to_lyrics_likes_out(self, record):
        return LyricsLikeOut(
            id = record[0],
            user_id = record[1],
            lyrics_id = record[2],
            created_at = record[3]
        )
