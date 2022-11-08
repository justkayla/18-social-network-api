/*
const connection = require('../config/connection');
const { User, Thought } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Create empty array to hold users
    const users = [];

    // Loop 5 times -- add users to the users array
    for (let i = 0; i < 5; i++) {
        // Get some random 
    }


})
*/