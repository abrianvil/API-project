const express = require('express');
const { Spot, SpotImage, Review, User, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const router = express.Router();






// Get all Reviews by a Spot's id

// Get all Reviews of the Current User






module.exports = router;
