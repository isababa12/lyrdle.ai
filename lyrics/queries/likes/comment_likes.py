from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from queries.pool import pool


class CommentLikeOut(BaseModel):
    id: int
    user_id: int
    comment_id: int
    created_at: Optional[datetime]

class Error(BaseModel):
    message: str


class CommentLikeQueries:

    def get_all(self, comment_id: int) -> Union[Error, List[CommentLikeOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , user_id
                            , comment_id
                            , created_at
                        FROM comment_likes
                        WHERE comment_id = %s
                        ORDER BY created_at DESC;
                        """,
                        [comment_id]
                    )
                    return [
                        self.record_to_comment_like_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return Error(message="Could not get comment likes")


    def create(self, user_id: int, comment_id: int) -> Union[Error, CommentLikeOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO comment_likes
                            (user_id, comment_id)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            user_id,
                            comment_id,
                        ]
                    )
                    id = result.fetchone()[0]
                    return CommentLikeOut(id=id, user_id=user_id, comment_id=comment_id)
        except Exception as e:
            print(e)
            return Error(message="Could not create comment like")


    def delete(self, comment_like_id: int) -> Union[Error, bool]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM comment_likes
                        WHERE id = %s
                        """,
                        [comment_like_id]
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
            return Error(message="Could not delete comment like")


    def record_to_comment_like_out(self, record):
        return CommentLikeOut(
            id = record[0],
            user_id = record[1],
            comment_id = record[2],
            created_at = record[3]
        )
