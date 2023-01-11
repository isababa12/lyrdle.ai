from pydantic import BaseModel
from datetime import datetime
from queries.pool import pool


class UserIn(BaseModel):
    email: str
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    created_at: datetime
    username_last_modified: datetime
    password_last_modified: datetime

class UsersOut(BaseModel):
    users: list[UserOut]


class UserQueries: pass
    # def create

    # def get_all

    # def get_one

    # def update

    # def delete
