steps = [
    [
        # "Up" SQL statement - Lyrics Table
        """
        CREATE TABLE lyrics (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL,
            user_input TEXT NOT NULL,
            ai_prompt TEXT NOT NULL,
            artist_name VARCHAR(70),
            song_name VARCHAR(200),
            user_output TEXT NOT NULL,
            posted BOOLEAN DEFAULT false,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            posted_at TIMESTAMP
        );
        """,
        # "Down" SQL statement - Lyrics Table
        """
        DROP TABLE lyrics;
        """
    ],
    [
        # "Up" SQL statement - Comments Table
        """
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY NOT NULL,
            comment_content TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            lyrics_id INTEGER REFERENCES lyrics(id),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP
        );
        """,
        # "Down" SQL statement - Comments Table
        """
        DROP TABLE comments;
        """
    ],
    [
        # "Up" SQL statement - Likes Table
        """
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL,
            lyrics_id INTEGER REFERENCES lyrics(id),
            comment_id INTEGER REFERENCES comments(id),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """,
        # "Down" SQL statement - Likes Table
        """
        DROP TABLE likes;
        """
    ]
]
