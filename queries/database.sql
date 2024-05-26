-- Crear la tabla para User
CREATE TABLE
    "User" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100),
        role VARCHAR(50),
        birthDate VARCHAR(10),
        dni VARCHAR(20) UNIQUE
    );

-- Crear la tabla para Team
CREATE TABLE
    Team (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        coachId INT,
        FOREIGN KEY (coachId) REFERENCES "User" (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );

-- Crear la tabla para Player
CREATE TABLE
    Player (
        id SERIAL PRIMARY KEY,
        userId INT UNIQUE,
        teamId INT,
        FOREIGN KEY (userId) REFERENCES "User" (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        FOREIGN KEY (teamId) REFERENCES Team (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );

-- Crear la tabla para Tournament
CREATE TABLE
    Tournament (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        organizerId INT,
        startDate DATE,
        endDate DATE,
        FOREIGN KEY (organizerId) REFERENCES "User" (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );

-- Crear la tabla para MatchStatistic
CREATE TABLE
    MatchStatistic (
        id SERIAL PRIMARY KEY,
        matchId INT,
        playerId INT,
        goals INT,
        assists INT,
        yellowCards INT,
        redCards INT,
        minutesPlayed INT,
        FOREIGN KEY (matchId) REFERENCES Match (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        FOREIGN KEY (playerId) REFERENCES Player (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );

-- Crear la tabla para Match
CREATE TABLE
    Match (
        id SERIAL PRIMARY KEY,
        tournamentId INT,
        homeTeamId INT,
        awayTeamId INT,
        date TIMESTAMP(6),
        duration INT,
        result VARCHAR(50),
        FOREIGN KEY (tournamentId) REFERENCES Tournament (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        FOREIGN KEY (homeTeamId) REFERENCES Team (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        FOREIGN KEY (awayTeamId) REFERENCES Team (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );

-- Crear la tabla para TournamentStatistic
CREATE TABLE
    TournamentStatistic (
        id SERIAL PRIMARY KEY,
        tournamentId INT,
        playerId INT,
        goals INT,
        assists INT,
        yellowCards INT,
        redCards INT,
        FOREIGN KEY (tournamentId) REFERENCES Tournament (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        FOREIGN KEY (playerId) REFERENCES Player (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );