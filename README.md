# DevLink - Social Media App for Developers

## Overview

DevLink is a full-stack social media application designed for developers to connect, collaborate, and share experiences.

## Key Features

1. **User Authentication:**
   - Secure account creation and login using JSON Web Tokens (jsonwebtoken).

2. **Post Creation and Interaction:**
   - Create posts to share updates, ask questions, and engage in discussions.
   - Supports likes and comments.

3. **Likes and Interactions:**
   - Track and display the number of likes for each post.
   - Users can comment on posts.

4. **UI and State Management:**
   - Built with React for a dynamic and responsive user interface.
   - State management using Redux for a scalable and predictable state architecture.

5. **Backend Technologies:**
   - Server-side logic built with Node.js and Express.
   - MongoDB used as a NoSQL database for storing user data and posts.
   - Mongoose employed as the ODM library for MongoDB and Node.js.

6. **Asynchronous Requests:**
   - Axios used for handling asynchronous requests between the frontend and backend.

7. **Date Handling:**
   - Proper date handling integrated using the `moment` library.

8. **Concurrent Development:**
   - Utilizes `concurrently` and `nodemon` for concurrent development of the server and client.

## Technologies Used

- **Frontend:**
  - React
  - Redux
  - Axios
  - Moment.js

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JSON Web Tokens (jsonwebtoken)

- **Development Tools:**
  - Concurrently
  - Nodemon

## Usage

1. **Clone the Repository:**
    ```
   git clone https://github.com/your-username/devlink.git

3. **install dependecies:**
   ```
   cd devlink
   npm install
   cd client
   npm install

   ```
3. run the app
   ```
   npm run dev
   ```
