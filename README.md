# assignment1-fullStackWebDev

POI - Point Of Interest

This project contains a database of POI for stops along the different routes of the Camino de Santiago. It allows users to keep a log of places they stayed
- storing the co-ordinates and an optional description.

The project was deployed using glitch. Each stop within a user's secure login is stored within a "Route" which is a collection of stops. Users can sign up and log in;
CRUD routes and playlists.

The project was completed with a Test Driven Development process. Multiple tests were used for testing the features of users, routes and stops as well as the various
 storage methods (Mem, JSON, Mongo) and the API. The API was created with Swagger documentation and full JWT security.


## Repository overview

Provide an overview of the directory structure and files, for example:

├── README.md
├── data
├── gen
│   ├── analysis
│   ├── data-preparation
│   └── paper
└── src
    ├── analysis
    ├── data-preparation
    └── paper


## Running instructions
The app can be accessed here  
https://pitch-famous-book.glitch.me

Building
npm install
To run the application, execute the following from within the project folder:

npm run dev
The application should be served on:

http://localhost:3000/


