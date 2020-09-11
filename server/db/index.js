const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/cryptotracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((e) => {
        console.error('MongoDB Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;
