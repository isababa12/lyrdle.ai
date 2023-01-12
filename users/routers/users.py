from fastapi import (
    Depends,
    APIRouter,
    # HTTPException,
    # status,
    # Response,
    # Request,
)
from queries.users import (
    UserIn,
    UserOut,
    UserQueries,
    Error,
    # HttpError,
    # DuplicateUserError,
    # UserOutWithPassword
)
from typing import Union, List
# from jwtdown_fastapi.authentication import Token
# from authenticator import authenticator


router = APIRouter()

# @router.get("/token", response_model=UsersToken | None)
# async def get_token(
#     request: Request,
#     account: dict = Depends(authenticator.try_get_current_account_data)
# ) -> UsersToken | None:
#     if account and authenticator.cookie_name in request.cookies:
#         return {
#             "access_token": request.cookies[authenticator.cookie_name],
#             "type": "Bearer",
#             "account": account,
#         }

@router.get("/api/users",response_model=Union[List[UserOut], Error])
def get_all_users(
    repo: UserQueries = Depends()
):
    return repo.get_all_users()


@router.post("/api/users",response_model=Union[UserOut, Error])
def create_user(
    info: UserIn,
    # request: Request,
    # response: Response,
    repo: UserQueries = Depends(),
):
    return repo.create_user(info)
    # hashed_password = authenticator.hash_password(info.password)
    # try:
    #     account = accounts.create(info, hashed_password)
    # except DuplicateUserError:
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST,
    #         detail="Cannot create an account with those credentials",
    #     )
    # form = UserForm(username=info.email, password=info.password)
    # token = await authenticator.login(response, request, form, accounts)
    # return UsersToken(account=account, **token.dict())
