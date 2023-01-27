# Data models

## Users microservice

| name                   | type        | unique | optional |
| ---------------------- | ------------| ------ | -------- |
| id                     | Serial      | yes    | false    |
| username               | Varchar     | yes    | false    |
| password               | Varchar     | no     | false    |
| email                  | Varchar     | yes    | false    |
| hashed_password        | Varchar     | yes    | false    |
| created_add            | Timestamp   | no     | false    |
| username_last_modified | Timestamp   | no     | true     |
| password_last_modified | Timestamp   | no     | true     |


## Lyrics
| name             | type         | unique | optional |
| ---------------- | ------------ | ------ | -------- |
| id               | Serial       | yes    | false    |
| user_id          | Int          | no     | false    |
| user_input       | Varchar      | no     | false    |
| ai_prompt        | Varchar      | no     | false    |
| artist_name      | Varchar      | no     | false    |
| song_name        | Varchar      | no     | false    |
| user_output      | Varchar      | no     | false    |
| posted           | Boolean      | no     | true     |
| created_at       | Timestamp    | no     | false    |
| posted_at        | Timestamp    | no     | true     |



## Lyrics Likes
| name             | type         | unique | optional |
| ---------------- | ------------ | ------ | -------- |
| id               | Serial       | yes    | false    |
| user_id          | Int          | no     | false    |
| lyrics_id        | Int          | no     | false    |
| created_at       | Timestamp    | no     | false    |
