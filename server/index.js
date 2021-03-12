const express = require('express');
const path = require('path');
const mongoose = require("mongoose")
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const bodyParser = require('body-parser');
const cors = require('cors')

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const {MONGO_URI } = require('./config')

const db = require("./database")

const postRouter = require("./Routes/post");
const userRoutes = require("./Routes/user");
const profileRoutes = require("./Routes/profile");




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
app.use(express.json())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build'))); // Kindly check this out Adomi

// const directory = path.join(__dirname, './images');
// app.use("/images", express.static(directory));

  // Database connections here!!

  

// API Calls do go here below!

app.use("/api/posts", postRouter)
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);

// app.get('/api', function (req, res) {
//   res.set('Content-Type', 'application/json');
//   res.send('{"message":"Hello from the custom server!"}');
// });


  // All remaining requests return the React app, so it can handle routing.
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

 
app.use(cors());

// Testing express endpoints
exports.app = app;

app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}