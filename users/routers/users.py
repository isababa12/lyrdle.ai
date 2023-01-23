from fastapi import (
    Depends,
    APIRouter,
    Response,
    Request,
)
from queries.users import (
    UserIn,
    UserOut,
    UserOutWithPassword,
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
    user: dict = Depends(authenticator.try_get_current_account_data),
):
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.post("/api/users", response_model=Union[AccountToken, HttpError])
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


@router.get("/api/users", response_model=Union[List[UserOutWithPassword], Error])
def get_all_users(repo: UserQueries = Depends()):
    return repo.get_all_users()


@router.get("/api/users/current", response_model=UserOut)
def get_user_by_info(
    user: UserOut = Depends(authenticator.get_current_account_data),
):
    return user


@router.get("/api/users/{username}", response_model=UserOut)
def get_user_by_username(username: str, queries: UserQueries = Depends()):
    return queries.get_one_user_username(username)


@router.put("/api/users/current", response_model=Union[UserOut, UserOutWithPassword, Error])
def update_user(
    new_info: UserIn,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: UserQueries = Depends(),
):
    user_id = account["id"]
    if new_info.email == "":
        email = account["email"]
    else:
        email = new_info.email
    if new_info.username == "":
        username = account["username"]
    else:
        username = new_info.username
    if new_info.password == "":
        password = ""
        hashed_password = account["hashed_password"]
    else:
        password = new_info.password
        hashed_password = authenticator.hash_password(new_info.password)
    return repo.update(user_id, email, username, hashed_password, password)



@router.delete("/api/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    repo: UserQueries = Depends(),
) -> bool:
    return repo.delete(user_id)
