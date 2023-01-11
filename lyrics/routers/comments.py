from fastapi import APIRouter
from queries.comments import (
    CommentIn,
    CommentOut,
    CommentsOut,
    CommentQueries
)

router = APIRouter()
