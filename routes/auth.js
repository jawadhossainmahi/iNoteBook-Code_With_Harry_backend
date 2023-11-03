const express = require('express');
const router = express.Router();
const User = require('../models/User');



// Create a user using Post "/api/auth/" . disnt reuquire auth 
router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.json(req.body)
})

module.exports = router