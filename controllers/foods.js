const express = require('express'); 
const router = express.Router();

const User = require('../models/user.js');


// starts with /users/:userId/foods
router.get('/', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user._id); 
        res.render('foods/index.ejs', {
            pantry: currUser.pantry,
        });
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

router.get('/new', async (req, res) => {
    res.render('foods/new.ejs')
});

router.get('/:itemId', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user)
        const currFood = currUser.pantry.id(req.params.itemId)

        res.render('foods/show.ejs', {
            currFood: currFood, 
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
    
})


router.post('/', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user)

        currUser.pantry.push(req.body)
        await currUser.save()
        res.redirect(`/users/${currUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.delete('/:itemId', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user)
        currUser.pantry.id(req.params.itemId).deleteOne()
        await currUser.save()

        res.redirect(`/users/${currUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:itemId/edit', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user)
        const currFood = currUser.pantry.id(req.params.itemId)

        res.render('foods/edit.ejs', {
            currFood: currFood,
        })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.put('/:itemId', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user)
        const currFood = currUser.pantry.id(req.params.itemId)

        currFood.set(req.body)
        await currUser.save()

        res.redirect(`/users/${currUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


module.exports = router;