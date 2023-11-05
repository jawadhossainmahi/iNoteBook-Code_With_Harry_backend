const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult, ExpressValidator } = require('express-validator');


// Create a user using Post "/api/auth/createuser" . disnt reuquire auth 

router.post('/createuser',

    // here is ExpressValidator start

    [
        body('name').isLength({ min: 3 }),
        body('email').isEmail(),
        body('password', "Password must be atleast 5 Character").isLength({ min: 3 }),
    ],

    // here is ExpressValidator end

    async (req, res) => {
        const errors = validationResult(req);

        //   this will send error message if there is any error occurs

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //   if there is no erroor this will create new data in database which is inputed in req

        // if there any error occurs inside the try then catch runs or else catch wont run
        
        try {

            // checking if there alredy exist email in the data base
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exist" })
            }
            user = await User.create(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                }
            )
            res.json(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).send('some error occured')
        }
    })

module.exports = router