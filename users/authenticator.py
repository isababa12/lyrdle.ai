# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UserQueries, UserOut


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        repo: UserQueries,
    ):
        return repo.get_one_user_username(username)

    def get_account_getter(
        self,
        repo: UserQueries = Depends(),
    ):
        return repo

    def get_hashed_password(self, user: UserOut):
        return user.hashed_password

    def get_account_data_for_cookie(self, user: UserOut):
        return user.username, UserOut(**user.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
