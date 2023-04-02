CREATE TABLE IF NOT EXISTS files (
    id UUID PRIMARY KEY,
    published TIMESTAMP NOT NULL,
    content TEXT NOT NULL,
    title TEXT NOT NULL,
    tags STRING [],
    photoUrl TEXT NOT NULL
);