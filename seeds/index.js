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

const seedDB = async (campgrounds) => {
    await Campground.deleteMany({})
    for (let campground of campgrounds) {
        const camp = new Campground({
            title: campground.title,
            location: campground.location,
            description: campground.description,
            price: Number(campground.price),
            image: `https://picsum.photos/400?random=${Math.random()}`

        })
        await camp.save()
    }
    console.log('Database seeded')
}

seedDB(campgrounds).then(() => {
    mongoose.connection.close()
    console.log('Connection closed')
})