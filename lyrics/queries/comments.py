from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from queries.pool import pool


class CommentOut(BaseModel):
    id: int
    comment_content: str
    user_id: int
    lyrics_id: int
    created_at: Optional[datetime]
    modified_at: Optional[datetime]

class Error(BaseModel):
    message: str


class CommentQueries:

    def get_all(self, lyrics_id: int) -> Union[Error, List[CommentOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , comment_content
                            , user_id
                            , lyrics_id
                            , created_at
                            , modified_at
                        FROM comments
                        WHERE lyrics_id = %s
                        ORDER BY created_at DESC;
                        """,
                        [lyrics_id]
                    )
                    return [
                        self.record_to_comment_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return Error(message="Could not get comments")


    def create(self, user_id: int, lyrics_id: int, comment_content: str) -> Union[Error, CommentOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO comments
                            (comment_content, user_id, lyrics_id)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            comment_content,
                            user_id,
                            lyrics_id,
                        ]
                    )
                    id = result.fetchone()[0]
                    return CommentOut(id=id, comment_content=comment_content, user_id=user_id, lyrics_id=lyrics_id)
        except Exception as e:
            print(e)
            return Error(message="Could not create comment")


    # Update comment content
    def update(self, comment_id: int, new_content: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE comments
                        SET comment_content = %s, modified_at = CURRENT_TIMESTAMP
                        WHERE id = %s
                        """,
                        [
                            new_content,
                            comment_id
                        ]
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


    def delete(self, comment_id: int) -> Union[Error, bool]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM comments
                        WHERE id = %s
                        """,
                        [comment_id]
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
            return Error(message="Could not delete comment")


    def record_to_comment_out(self, record):
        return CommentOut(
            id = record[0],
            comment_content = record[1],
            user_id = record[2],
            lyrics_id = record[3],
            created_at = record[4],
            modified_at = record[5]
        )
