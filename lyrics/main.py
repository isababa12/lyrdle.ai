from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import lyrics, comments
from routers.likes import lyrics_likes, comment_likes

app = FastAPI()

app.include_router(lyrics.router)
app.include_router(lyrics_likes.router)
app.include_router(comments.router)
app.include_router(comment_likes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
