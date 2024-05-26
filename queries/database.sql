CREATE DATABASE TOURNAMENT;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ORGANIZER', 'COACH', 'PLAYER'))
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    coach_id INT REFERENCES users(id)
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    team_id INT REFERENCES teams(id)
);

CREATE TABLE tournaments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    organizer_id INT REFERENCES users(id),
    start_date DATE NOT NULL,
    end_date DATE
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    tournament_id INT REFERENCES tournaments(id),
    home_team_id INT REFERENCES teams(id),
    away_team_id INT REFERENCES teams(id),
    date TIMESTAMP NOT NULL,
    duration INT,
    result VARCHAR(50)
);

CREATE TABLE tournament_statistics (
    id SERIAL PRIMARY KEY,
    tournament_id INT REFERENCES tournaments(id),
    player_id INT REFERENCES players(id),
    goals INT,
    assists INT,
    yellow_cards INT,
    red_cards INT
);

CREATE TABLE match_statistics (
    id SERIAL PRIMARY KEY,
    match_id INT REFERENCES matches(id),
    player_id INT REFERENCES players(id),
    goals INT,
    assists INT,
    yellow_cards INT,
    red_cards INT,
    minutes_played INT
);
