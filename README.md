# Norway Website

This project is a Node.js-based web application for hosting or interacting with YouTube video content. It features dynamic content rendering using Express.js and includes a public-facing user interface.

## Features
- Dynamic video display using EJS templates in the `views` folder.
- Public assets (CSS, JS, images) located in the `public` folder.
- Node.js and Express.js framework for server-side rendering.
- PostgreSQL database integration for managing users and comments.
- Pre-configured `package.json` for dependencies management.

## Project Structure
youtube-video-site/
├── node_modules/        # Dependencies managed by npm
├── public/              # Static files (CSS, JS, images)
├── views/               # EJS templates for dynamic content
├── app.js               # Main server file
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Dependency tree lockfile

## Installation
1. Clone the repository: `git clone https://github.com/anwillow/Final_Project.git && cd youtube-video-site`  
2. Install dependencies: `npm install`
3. Setup database
4. Start the server: `node app.js`
5. Open your browser and navigate to: `http://localhost:3000`

## Requirements
- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (v12 or higher)

## Database Setup
Open PostgreSQL terminal (`psql`) and create the database:
   ```sql
   CREATE DATABASE project;

   \c project

   CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
   );

   CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   \dt

   INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');
   INSERT INTO comments (user_id, comment) VALUES (1, 'This is a test comment.');

   SELECT * FROM users;
   SELECT * FROM comments;
  ```

## Database Configuration

In the project file where the database connection is defined (e.g., `app.js` or a separate database configuration file), update the `user` property in the `Pool` configuration to match your PostgreSQL username:
   ```javascript
   const { Pool } = require('pg');  
      const pool = new Pool({
      user: '<your-postgresql-username>',
      host: 'localhost',
      database: 'project',
      port: 5432,
   }); 
   ```
Replace `<your-postgresql-username>` with your actual PostgreSQL username (e.g., `kost9nyt`).


## Contribution
Feel free to submit issues or pull requests to improve this project.

## License
This project is licensed under the MIT License. See `LICENSE` for details.
