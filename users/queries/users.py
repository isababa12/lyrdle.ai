from pydantic import BaseModel
from typing import List, Union
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


class UserOutWithPassword(BaseModel):
    id: int
    email: str
    username: str
    password: str
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


# class DuplicateUserError(ValueError):
#     pass


class UserQueries:
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
                            hashed_password,
                        ],
                    )
                    id = result.fetchone()[0]
                    return UserOut(
                        id=id,
                        email=user.email,
                        username=user.username,
                        hashed_password=hashed_password,
                    )
        except Exception as e:
            print(e)
            return {"message": "create did not work"}

    def get_all_users(self) -> Union[List[UserOutWithPassword], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id
                        , email
                        , username
                        , password
                        , hashed_password
                        FROM users
                        ORDER BY id;
                        """
                    )
                    results = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return results
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

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
                    hashed_password=record[3],
                )

    def update(
        self,
        user_id: int,
        email: str,
        username: str,
        hashed_password: str,
        password: str,
    ) -> Union[UserOut, UserOutWithPassword, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    if password == "":
                        cur.execute(
                            """
                            UPDATE users
                            SET email = %s
                            , username = %s
                            , hashed_password = %s
                            WHERE id = %s
                            """,
                            [
                                email,
                                username,
                                hashed_password,
                                user_id,
                            ],
                        )
                        updated_row_count = cur.rowcount
                        if updated_row_count > 0:
                            print("Updated rows: ", updated_row_count)
                            return UserOut(
                                id=user_id,
                                email=email,
                                username=username,
                                hashed_password=hashed_password,
                            )
                        else:
                            print("Nothing to update.")
                            return False
                    else:
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
                                email,
                                username,
                                password,
                                hashed_password,
                                user_id,
                            ],
                        )
                        updated_row_count = cur.rowcount
                        if updated_row_count > 0:
                            print("Updated rows: ", updated_row_count)
                            return UserOutWithPassword(
                                id=user_id,
                                email=email,
                                username=username,
                                password=password,
                                hashed_password=hashed_password,
                            )
                        else:
                            print("Nothing to update.")
                            return False
        except Exception as e:
            print(e)
            return {"message": "Unable to update User"}

    def delete(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    deleted_row_count = cur.rowcount
                    if deleted_row_count > 0:
                        print("Deleted rows: ", deleted_row_count)
                        return True
                    else:
                        print("Nothing to delete.")
                        return False
        except Exception as e:
            print(e)
            return False

    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)
