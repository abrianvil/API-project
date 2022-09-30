const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Op } = require('sequelize');
const router = express.Router();







module.exports = router;
