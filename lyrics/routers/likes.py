from fastapi import APIRouter
from queries.likes import (
    LikeIn,
    LikeOut,
    LikesOut,
    LikeQueries
)

router = APIRouter()
