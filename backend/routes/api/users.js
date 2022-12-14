// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max:30 })
        .withMessage('Username can not be less than 4 or more than 30 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a firstName.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a lastName.'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const existedEmail = await User.findOne({
        where: { email: email }
    })
    const existedUserName = await User.findOne({
        where: { username: username }
    })

    if (existedEmail) {
        res.status(403)
        res.json({
            message: "User already exists",
            statusCode: 403,
            // errors: {
            //     email: "User with that email already exists"
            // }
            errors: "User with that email already exists"

        })
    } else if (existedUserName) {
        res.status(403)
        res.json({
            message: "User already exists",
            statusCode: 403,
            // errors: {
            //     "username": "User with that username already exists"
            // }
            errors: "User with that username already exists"

        })
    } else {

        const result = await User.signup({ firstName, lastName, email, username, password });

        let newToken = await setTokenCookie(res, result);
        let user = result.toJSON()
        user.token = newToken

        return res.json(user);
    }
});



module.exports = router;
