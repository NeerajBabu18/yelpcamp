const mongoose = require('mongoose')
const Campground = require('../models/campground')
const path = require('path');

const filePath = path.join(__dirname, 'campgrounds.json');

const fs = require('fs');

const data = fs.readFileSync(filePath, 'utf8');
const campgrounds = JSON.parse(data);

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("Mongo Connection Open")
    })
    .catch((err) => {
        console.log(err, "Mongo Connection Error!")
    })

const seedDB = async () => {
    await Campground.deleteMany({})
    await Campground.insertMany(campgrounds)
    console.log('Database seeded')
}

seedDB().then(() => {
    mongoose.connection.close()
    console.log('Connection closed')
})