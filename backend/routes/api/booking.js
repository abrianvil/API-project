const express = require('express');
const { Spot, SpotImage, Review, User, Booking, ReviewImage, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Op } = require('sequelize');
const booking = require('../../db/models/booking');
const router = express.Router();



// Get all of the Current User's Bookings
router.get('/current',requireAuth, async (req, res, next) => {
    const userBookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: { model: Spot }, //,{ model: User, attributes:["id","firstName","lastName","createdAt","updatedAt"]},
        // attributes:['id','spotId']
    })

    let Bookings = []
    for (let booking of userBookings) {
        const prev = await Spot.findByPk(booking.spotId, {

            attributes: [],
            include: { model: SpotImage, attributes: ['url'], where: { preview: true } }

        })
        let urlData = prev.toJSON()
        let img = urlData.SpotImages[0]
        console.log(img.url)
        userBookings.forEach(booking => {
            Bookings.push(booking.toJSON())
        })
        Bookings.forEach(booking => {
            booking.Spot.previewImage = img.url

            delete booking.Spot.createdAt
            delete booking.Spot.updatedAt
        })
    }
    res.status(200)
    res.json({ Bookings })
})

// Edit a Booking
router.put('/:bookingId',requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    if (booking) {
        const { startDate, endDate } = req.body
        const newStartDate = new Date(startDate)
        const newEndDate = new Date(endDate)

        if (newStartDate >= newEndDate) {
            return res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    endDate: "endDate cannot be on or before startDate"
                }
            })
        }
        booking.update({
            startDate,
            endDate
        })
        res.status(200)
        res.json(booking)
    } else {
        res.status(404)
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
})

// Delete a Booking
router.delete('/:bookingId',requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    if (booking) {
        booking.destroy()
        res.status(200)
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        res.status(404)
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
})




module.exports = router;
