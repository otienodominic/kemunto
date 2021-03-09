const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const logger = require('morgan')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

const db = require('./database')

const postRouter = require("./Routes/post");
const userRoutes = require("./Routes/user");
const profileRoutes = require("./Routes/profile");



const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  app.use(logger('dev'))

  // Priority serve any static files.
const directory = path.join(__dirname, './images');
app.use("/images", express.static(directory));
// app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

  // Answer API requests.
app.use("/api/posts", postRouter)
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);

  // All remaining requests return the React app, so it can handle routing.

  app.use(express.static(path.join(__dirname, 'public')));  
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'development server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
