# API DESIGN

## Users Service

### Create a new user

* Endpoint path: /api/users
* Endpoint method: POST

* Request body:
```json
    {
        "email": str,
        "username": str,
        "password": str
    }
```

* Response: Account information and a token
* Response shape (JSON):
```json
    {
        "access_token": str,
        "token_type": "Bearer",
        "user": {
                "id": int,
                "email": str,
                "username": str,
                "hashed_password": str
            }
    }
```

### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: str
  * password: str

* Response: Account information and a token
* Response shape (JSON):
```json
    {
      "accces_token": str,
      "token_type": "Bearer"
    }
```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
```json
    true
```

### Get current user info

* Endpoint path: /api/users/current
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Info for logged in user
* Response shape (JSON):
```json
    {
        "id": int,
        "email": str,
        "username": str,
        "hashed_password": str
    }
```

### Get user by username

* Endpoint path: /api/users/{username}
* Endpoint method: GET

* Response: Info for specified username
* Response shape (JSON):
```json
    {
        "id": int,
        "email": str,
        "username": str,
        "hashed_password": str
    }
```

### Update a user

* Endpoint path: /api/users/current
* Endpoint method: PUT

* Request body:
```json
    {
        "email": str,
        "username": str,
        "password": str
    }
```

* Response: A list of all lyrics
* Response shape:
 ```json
    {
        "id": int,
        "email": str,
        "username": str,
        "hashed_password": str
    }
```

### Delete a user

* Endpoint path: /api/users/current
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Indication of success or failure
* Response shape:
```json
    {
        boolean
    }
```

## Lyrics Service

### Create new lyrics

* Endpoint path: /api/users/current/lyrics
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body:
```json
    {
        "user_input": str,
        "artist_name": str,
        "song_name": str
    }
```

* Response: The created lyrics details
* Response shape (JSON):
```json
    {
        "id": int,
        "user_id": int,
        "user_input": str,
        "artist_name": str,
        "song_name": str,
        "ai_prompt": str,
        "user_output": str
    }
```

### Get a list of all lyrics

* Endpoint path: /api/lyrics
* Endpoint method: GET

* Response: A list of all lyrics
* Response shape:
```json
    {
      [
        {
            "id": int,
            "user_id": int,
            "user_input": str,
            "artist_name": str,
            "song_name": str,
            "ai_prompt": str,
            "user_output": str,
            "created_at": datetime,
            "posted": bool,
            "posted_at": datetime,
        },
      ]
    }
```

### Get a list of current user's lyrics

* Endpoint path: /api/users/current/lyrics
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of all lyrics for current user
* Response shape:
```json
    {
      [
        {
            "id": int,
            "user_id": int,
            "user_input": str,
            "artist_name": str,
            "song_name": str,
            "ai_prompt": str,
            "user_output": str,
            "created_at": datetime,
            "posted": bool,
            "posted_at": datetime,
        },
      ]
    }
```

### Update a lyrics posted status

* Endpoint path: /api/users/current/lyrics/{lyrics_id}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request body:
```json
    {
        "posted": bool,
    }
```

* Response: Indication of success or failure
* Response shape:
```json
    {
        bool
    }
```

### Delete lyrics

* Endpoint path: /api/users/current/lyrics/{lyrics_id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Indication of success or failure
* Response shape:
```json
    {
        bool
    }
```

### Like a lyrics post (Create a lyrics like)

* Endpoint path: /api/users/current/lyrics/{lyrics_id}/lyrics_likes
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Response: Details for created lyrics like
* Response shape:
```json
    {
        "id": int,
        "user_id": int,
        "lyrics_id": int,
    }
```

### Get all likes for a lyrics post

* Endpoint path: /api/users/current/lyrics/{lyrics_id}/lyrics_likes
* Endpoint method: GET

* Response: Indication of success or failure
* Response shape:
```json
    {
        [
            {
                "id": int,
                "user_id": int,
                "lyrics_id": int,
                "created_at": datetime
            }
        ]
    }
```

### Remove like from lyrics post (Delete a lyrics like)

* Endpoint path: /api/users/current/lyrics/{lyrics_id}/lyrics_likes/{lyrics_like_id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Indication of success or failure
* Response shape:
```json
    {
        boolean
    }
```
