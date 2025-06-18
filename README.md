# NxtWave Backend Application

This repository contains the backend for NxtWave Backend, built with Node.js and Express. It provides APIs to support the frontend and is deployed on Render. link https://nxtwave-backend-29ei.onrender.com

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Running Locally](#running-locally)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)

## Features

* RESTful API design
* Secure and scalable architecture
* User Authentication
* Database Management

## Technologies Used

* **Node.js**: JavaScript runtime
* **Express.js**: Web application framework
* **Mongodb**: Database
* **JWT**: for Authentication

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

* Node.js (LTS version recommended)
* npm (comes with Node.js) or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MidhunReddyS/nxtwave-backend.git
    cd nxtwave-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variables. Replace the placeholder values with your actual credentials.

1. MONGO_URI=
2. JWT_ACCESS_TOKEN=
3. DOMAIN = 

### Running Locally

1. **To start the development server**:
        ```bash
        npm start
        # or
        node server.js
        ```

## Deployment
This backend is deployed on Render.

The deployment process typically involves:

Connecting your GitHub repository to Render.
Configuring build commands (e.g., npm install).
Setting up start commands (e.g., node app.js or npm start).
Adding your environment variables directly within the Render dashboard.

## API Endpoints

Here's a brief overview of some key API endpoints. 

1. POST /users/login: Get all users
2. POST users/signup: Register a new user
3. POST users/verify: Login a user
4. GET /users/getById: Get user details
5. DELETE /users/delete: delete user