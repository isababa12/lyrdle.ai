from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Union
from queries.pool import pool


class UserIn(BaseModel):
    email: str
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str

class Error(BaseModel):
    message: str

# class UserOutWithPassword(UserOut):
#     hashed_password:str

# class HttpError(BaseModel):
#     detail: str

# class DuplicateUserError(ValueError):
#     pass

class UserQueries:

    def get_all_users(self) -> Union[List[UserOut], Error]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT id, username, email, created_at,
                    username_last_modified, password_last_modified
                    FROM users
                    ORDER BY username;
                """)
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)
                return results

    def create_user(self,user:UserIn) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute("""
                        INSERT INTO users
                            (email, username, password)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.email,
                            user.username,
                            user.password
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.user_in_to_out(id,user)

        except Exception:
            return{"message": "create did not work"}

    def user_in_to_out(self,id: int, user:UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)
