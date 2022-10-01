// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

// Log in====>question? does the token val matches the cookie token
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    let newToken= await setTokenCookie(res, user);
    let result=user.toJSON()
    result.token=newToken
    return res.json(
        result
    );
});

//login out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    // res.clearCookie('XSRF-TOKEN');

    return res.json({ message: 'success' });
});

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json(
                 user.toSafeObject()
            );
        } else return res.json({end:'no user'});
    }
);

module.exports = router;
