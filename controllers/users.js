const express = require('express'); 
const router = express.Router();

const User = require('../models/user.js');

// users

router.get('/', async (req, res) => {
    
    try {
        const allUsers = await User.find({}) //finds all the users in the database

        res.render('users/index.ejs', {
            users: allUsers,
        })
        
    } catch (error) {
        console.log(error)

    }
    res.render('users/index.ejs')
})

router.get('/:userId', async (req, res) => {
    try {
        const currUser = await User.findById(req.params.userId)
        const userFood = currUser.pantry

        res.render('users/show.ejs', {
            user: currUser,
            foods: userFood,
        })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }


})

module.exports = router;