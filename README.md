# User Authentication API

This project is a user authentication API built with Node.js, Express, Sequelize, and MySQL. It includes user registration, login, and profile retrieval functionalities, with JWT-based authentication and bcrypt for password hashing.

## Table of Contents

- [Setup](#setup)
- [Usage](#usage)


## Setup

1. Create a `.env` file in the root directory and add your environment variables:
    ```plaintext
    JWT_SECRET=your_jwt_secret_key
    PORT = port_number
    ```

2. Initialize Sequelize and create the database:
    ```bash
    sequelize init
    sequelize db:create
    ```

3. Run migrations to create the Users table:
    ```bash
    sequelize db:migrate
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```

2. The server will be running on `http://localhost:3000`.




