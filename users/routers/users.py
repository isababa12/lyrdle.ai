from fastapi import APIRouter
from queries.users import (
    UserIn,
    UserOut,
    UsersOut,
    UserQueries
)

router = APIRouter()
