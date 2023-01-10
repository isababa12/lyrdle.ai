steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            email VARCHAR(320) NOT NULL UNIQUE,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(50) NOT NULL,
            username_last_modified TIMESTAMP,
            password_last_modified TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ]
]
