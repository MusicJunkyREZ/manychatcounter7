const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
const connectDB = require('../DB/connection');
const keys = require('../config/keys');
const username = keys.username;
const password = keys.password;

const db = require('../DB/connection')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;


route.post('/', async (req, res) => {
    // const{id, key, page_id, status, first_name, last_name,
    //     name, gender, profile_pic, locale, language, timezone} = req.body;

    let user = {};

    user.id = req.body.id,
    user.key = req.body.key,
    user.page_id = req.body.page_id,
    user.status = req.body.status,
    user.first_name = req.body.first_name,
    user.last_name = req.body.last_name,
    user.name = req.body.name,
    user.gender = req.body.gender,
    user.profile_pic = req.body.profile_pic,
    user.locale = req.body.locale,
    user.language = req.body.language,
    user.timezone = req.body.timezone,
    user.last_interaction = req.body.last_interaction,
    user.last_seen = req.body.last_seen

    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);
    console.log(userModel)
});

route.get('/getUsers', async (db, res) => {

    mongo.connect(`mongodb+srv://${username}:${password}@manychat-counter7-8j03o.mongodb.net/test?retryWrites=true&w=majority`, async function (err, db) {
    if (err) throw err;
    var dB = db.db('test');
    var currentUsers = await dB.collection('users').find({}).toArray();
    // console.log(currentUsers);
    res.json(currentUsers);
    }); 
});

// Use the below route for counter
route.get('/getTodaysUsers', async (db, res) => {
    // This gets all the information
    mongo.connect(`mongodb+srv://${username}:${password}@manychat-counter7-8j03o.mongodb.net/test?retryWrites=true&w=majority`, async function (err, db) {
        if (err) throw err;
        var dB = db.db('test');
        var currentUsers = await dB.collection('users').find({}).toArray();

        // This will loop through the array and return the dates
        // Array for scope outside of the loop
        let lastInteractionArray = [];

        let currentUsersLength = currentUsers.length;
        for(let i = 0 ; i < currentUsersLength; i++) { 
            // This returns the information but only in scope of the loop   
            // let lastInteractionList = currentUsers[i].last_interaction;           
            // console.log(lastInteractionList)

            // Push array to lastInteractionArray outside of loop and make them into strings while trimming them to only show the year-month-day
            lastInteractionArray.push(JSON.stringify(currentUsers[i].last_interaction).substring(1, 11));
        }

        // Check that the lastInteractionArray is now globally available
        console.log(lastInteractionArray)

        // Date variables
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd
        console.log(today);

        // Compare today to dates in lastInteractionArray
        var count = 0;
        for(var k = 0; k < lastInteractionArray.length; ++k){
            if(lastInteractionArray[k] == today)
                count++;
        }
        console.log(count);

        // Change count to string so ManyChat can grab it
        countToString = JSON.stringify(count)
        console.log(countToString)
        var countObject = {
            "count" : count
        }
        console.log(countObject)
        res.json(countObject);

    }); //End mongo.connect
}); //End GET function

module.exports = route;
