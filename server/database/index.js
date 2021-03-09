const mongoose = require('mongoose');
const {MONGO_URI} = require('../config')
mongoose.Promise = global.Promise;


// Connect MongoDB at default port 27017.
let mong = mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});