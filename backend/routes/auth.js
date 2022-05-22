const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser.js');

const JWT_secret = 'secret_string';

// route-3 create user
router.post('/createUser', [
    //error check
    body('name', 'enter valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter valid password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: 'false', errors: errors.array() });
    }
    try {
        // chack whelther the user with the same mail exists.
        let user = await User.findOne({
            email: req.body.email,
        })

        if (user) {
            return res.status(400).json({
                success: 'false',
                email: "there already another one exists with the same email"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        // check whelther the user exixts already
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })

        const data = {
            user: {
                id: user.id,
            }
        }

        const authToken = JWT.sign(data, JWT_secret);
        res.json({ success: 'true', authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occoured");
    }
})

// route-2:::authentication of the user
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter valid password').isLength({ min: 5 }),
], async (req, res) => {
    //let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: 'false', errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: 'false', error: 'please enter valid credentials' })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ success: 'false', error: 'please enter valid credentials' })
        }

        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = JWT.sign(data, JWT_secret);

        res.json({ success: 'true', authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occoured");
    }

})


// route -3 to get the details of the loggedin useer

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(400).send("internal server error");
    }
})

module.exports = router;