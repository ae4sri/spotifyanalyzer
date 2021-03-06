# Spotify Analyzer

## Overview
This is a web app that allows users to learn more about any artist/song that has charted on the Global Spotify Top 200, a chart that tracks the most streamed songs on Spotify everyday. The app uses a CSV database from Kaggle, https://www.kaggle.com/ivannatarov/spotify-daily-top-200-songs-with-genres-20172021, which I converted to SQLite with DB Browser. The web app allows users to search up any individual artist/song that has charted on the top 200 and see different statistics about those artists/songs. For example, this is what an artist's page will display: <img src="/readMeImages/artistpage.png"> and this is what an individual song's page will display: <img src="/readMeImages/songpage.png">

## How app was built/What tech was used
The app is fialry straightforward. The backend uses Node.js with the Koa framework, with SQLite3 as a database. The backend essentially just runs dymanically generated SQL queries based off URL parameters passed by Koa, and returns the data from those Sqlite3 queries. better-sqlite-3 is used to communicate with the database file, as it runs synchronously unlike the standard sqlite-3 package. Functions related to generating sql queries and getting data from the db are in /db/data.ts.

The front-end was built with Typescript, using Create-React-App, and Material UI. Axios is used for communication with the server, and state is managed with React Hooks. The front-end has its own repository over here: https://github.com/ae4sri/spotifyanalyzerfrontend

## How to run

To run the backend, all you need to do is download it, run the "npm install" script, and then "npm run dev" to boot it. To run the front-end, it's necessary to download it over here: https://github.com/ae4sri/spotifyanalyzerfrontend and run "npm install" on it as well. The front-end is booted with "npm start". As long as both are running at the same time, the frontend should be able to communicate with the backend and provide you the full web app. Note that the front-end, when communicating with the server, will always attempt to fetch from the localhost:3001 URL. To change this, go in the src/services/server.ts in the front-end repository linked above, and change the baseUrl variable to wherever you're hosting the server (default port is already 3001, so this is unnecessary unless you want to change the port/server address).
