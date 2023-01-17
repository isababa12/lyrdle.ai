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
        # Use your repo to get the user based on the
        # username (which could be an email)
        return repo.get_one_user_username(username)

    def get_account_getter(
        self,
        repo: UserQueries = Depends(),
    ):
        # Return the users. That's it.
        return repo

    def get_hashed_password(self, user: UserOut):
        # Return the encrypted password value from your
        # user object
        return user.hashed_password

    def get_account_data_for_cookie(self, user: UserOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return user.username, UserOut(**user.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
