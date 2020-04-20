## **UF NEURONAV WEB APPLICATION!**
 
## Introduction
This is the final course project for CEN 3031 at the University of Florida. 
 
### Contributors
- Wesley Finch 
- Alan Nguyen: alan.nguyen@ufl.edu
- Christie Ruales: cruales@ufl.edu
- Rohan Samanta
- Andrew Sowinski
- Rohil Tuli: rohil.tuli@ufl.edu
- Megan Wolf: megan.wolf@ufl.edu
 
### Features
- Patient Management System
  - Add, delete and edit patient information
- Appointment Management System
  - Add, delete and edit appointment information
  - Send automated text reminders to patients and notify administrators of confirmation replies
- Calendar View of all scheduled appointments
  - Synchronization with Google Calendar
- Send Text functionality for manual text message notifications
 
- Profile View
  - Update contact information
  - Update password
- Appointment View
  - View upcoming appointments with relevant information regarding date/time, appointment location, and doctor
- Navigation/Directions View
  - Driving directions to the parking lot/garage
  - Walking directions to clinic
 
### APIs Used
- Google Maps API
- Google Directions API
- Google Geolocation API
- Google Calendar API
- CRUD Operations
- User Authentication 
 
## Available Scripts
Run `npm install` from the root and then run `npm run-script install-all` from the root. Use the second command to install all dependencies at any time. 
 
Please note that any time the server is run in these scripts `nodemon` is used in place of `node` for easier development. If you are interested in how this works follow the nodemon In the project directory, you can run:
 
### `npm run-script dev`
 
Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.
 
### `npm run-script client`
 
Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.
 
 
### `npm run-script server`
 
Runs just the server in development mode.<br>
 
 
### `npm run build`
 
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
 
If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>
 
 
## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!
 
## Deployment
This project has been deployed with Heroku at the URL: https://arcane-plateau-92982.herokuapp.com/
 
Follow the instructions on the website below to deploy to Heroku. 
https://devcenter.heroku.com/articles/git
To deploy, you need to add a remote to git called heroku, and then run `git push heroku master`. 
