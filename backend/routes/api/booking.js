const express = require('express');
const { Spot, SpotImage, Review, User, Booking, ReviewImage, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Op } = require('sequelize');
const booking = require('../../db/models/booking');
const router = express.Router();



// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const userBookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: { model: Spot }, //,{ model: User, attributes:["id","firstName","lastName","createdAt","updatedAt"]},
        // attributes:['id','spotId']
    })


    let Bookings = []
    for (let booking of userBookings) {
        const prev = await Spot.findByPk(booking.dataValues.spotId, {

            attributes: [],
            include: { model: SpotImage, attributes: ['url'], where: { preview: true } }
        })
        // console.log('====>PREV \n \n \n', prev.toJSON())
        let urlData = prev.toJSON()
        let img = urlData.SpotImages[0]
        // console.log('=======>',img)
        // userBookings.forEach(booking => {
        //     Bookings.push(booking.toJSON())
        // })
        // Bookings.forEach(booking => {
        booking.Spot.dataValues.previewImage = img.url
        // console.log('+++++++', booking.Spot.dataValues)

        // console.log('*******', booking)
        delete booking.Spot.createdAt
        delete booking.Spot.updatedAt
        delete booking.Spot.description
        Bookings.push(booking)
        // })
    }
    // console.log(' \n \n \n', Bookings)
    res.status(200)
    res.json({ Bookings })
})

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
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
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
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
