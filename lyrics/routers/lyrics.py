from fastapi import APIRouter
from queries.lyrics import (
    LyricsIn,
    LyricsOut,
    LyricsListOut,
    LyricsQueries
)

router = APIRouter()
