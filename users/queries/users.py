from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Union
from jwtdown_fastapi.authentication import Token
from queries.pool import pool


class UserIn(BaseModel):
    email: str
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    username: str
    hashed_password: str

class Error(BaseModel):
    message: str

class HttpError(BaseModel):
    detail: str

class UserForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    user: UserOut

# class UserOutWithPassword(UserOut):
#     hashed_password: str

# class DuplicateUserError(ValueError):
#     pass

class UserQueries:

    def delete(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id]
                    )
                    # old_data = user.dict()
                    # return UserOutNoHashPass(id=user_id, **old_data)
                    return True

        except Exception as e:
            print(e)
            return{"message": "Unable to delete User"}

    def update(self, user_id: int, hashed_password: str, user: UserIn) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE users
                        SET email = %s
                         , username = %s
                         , password = %s
                         , hashed_password = %s
                        WHERE id = %s
                        """,
                        [
                            user.email,
                            user.username,
                            user.password,
                            hashed_password,
                            user_id
                        ]
                    )
                    # old_data = user.dict()
                    # return UserOutNoHashPass(id=user_id, **old_data)
                    return UserOut(
                        id=user_id,
                        email=user.email,
                        username=user.username,
                        hashed_password=hashed_password
                        )

        except Exception as e:
            print(e)
            return{"message": "Unable to update User"}


    def get_all_users(self) -> Union[List[UserOut], Error]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, email, username, hashed_password
                    FROM users
                    ORDER BY username;
                    """
                )
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)
                return results


    def get_one_user_username(self, username: str) -> Union[UserOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT users.id,
                    users.email,
                    users.username,
                    users.hashed_password
                    FROM users
                    WHERE users.username = %s
                    """,
                    [username],
                )

                record = result.fetchone()
                # print(record)
                if record is None:
                    return None
                return UserOut(
                    id=record[0],
                    email=record[1],
                    username=record[2],
                    hashed_password=record[3]
                )


    def create_user(self, user: UserIn, hashed_password: str) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO users
                            (email, username, password, hashed_password)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.email,
                            user.username,
                            user.password,
                            hashed_password
                        ]
                    )
                    id = result.fetchone()[0]
                    return UserOut(
                        id=id,
                        email=user.email,
                        username=user.username,
                        hashed_password=hashed_password
                    )
        except Exception:
            return{"message": "create did not work"}

    def user_in_to_out(self,id: int, user:UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)
