from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import lyrics
from routers.likes import lyrics_likes, comment_likes

app = FastAPI()

app.include_router(lyrics.router)
app.include_router(lyrics_likes.router)
app.include_router(comment_likes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get("/api/launch-details")
# def launch_details():
#     return {
#         "launch_details": {
#             "year": 2023,
#             "month": -2,
#             "day": "11",
#             "hour": 19,
#             "min": 0,
#             "tz:": "PST"
#         }
#     }
