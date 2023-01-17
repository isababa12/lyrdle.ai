from fastapi import (
    Depends,
    APIRouter,
    Response,
    Request,
)
from queries.users import (
    UserIn,
    UserOut,
    UserQueries,
    Error,
    HttpError,
    UserForm,
    AccountToken,
    # DuplicateUserError,
    # UserOutWithPassword
)
from typing import Union, List
from authenticator import authenticator


router = APIRouter()


@router.get("/token", response_model=Union[AccountToken, None])
async def get_token(
    request: Request,
    user: dict = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.post("/api/users",response_model=Union[AccountToken, HttpError])
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    user = repo.create_user(info, hashed_password)
    form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(user=user, **token.dict())


@router.get("/api/users",response_model=Union[List[UserOut], Error])
def get_all_users(
    repo: UserQueries = Depends()
):
    return repo.get_all_users()


@router.get("/api/users/current", response_model=UserOut)
def get_user_by_info(
    user: UserOut = Depends(authenticator.get_current_account_data),
):
    return user


@router.get("/api/users/{username}", response_model=UserOut)
def get_user_by_username(
    username: str,
    queries: UserQueries = Depends()
):
    return queries.get_one_user_username(username)
