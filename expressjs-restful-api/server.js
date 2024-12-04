'use strict';
import express from 'express'; // Import express
import mongoose from 'mongoose'; // Import mongoose to interact with a MongoDB instance
import bodyParser from 'body-parser'; // Middleware to process incoming request body objects
import Task from './api/models/tasksModel'; // Import created model
import routes from './api/routes/tasksRoutes'; // Import routes

const app = express(); // Define our app using express
const port = process.env.PORT || 3000; // Set the port
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/tasksdb';

// Mongoose instance url connection
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

/* Configure app to use bodyParser()
   this will let us get the data from a POST */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register the route
routes(app);

// Start the server
app.listen(port);
console.log('RESTful API demo server started on: ' + `http://localhost:${port}/`);

// Get an instance of the express Router
const router = express.Router();

// Health route to make sure everything is working (accessed at GET http://localhost:3000/health)
app.use('/health', require('express-healthcheck')({
  healthy: function() {
    return { message: 'ExpressJS web service is up and running' };
  }
}));

// All of our routes will be prefixed with /api
app.use('/api', router);

// Returning response with 404 when incorrect URL is requested 
app.use((req, res) => {
  res.status(404).send({
    error: {
      errors: [
        {
          domain: 'global',
          reason: 'notFound',
          message: 'Not Found',
          description: `Couldn't find the requested resource '${req.originalUrl}'`
        }
      ],
      code: 404,
      message: 'Not Found'
    }
  });
});
