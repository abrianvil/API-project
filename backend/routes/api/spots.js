const express = require('express');
const { Spot, SpotImage, Review, ReviewImage, Booking, User, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Op, json } = require('sequelize');
const router = express.Router();


router.use(express.json());

const validateSpotData = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    // check('lat')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Latitude is not valid"),
    // check('lng')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];



const validateReviewData = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    // console.log(req.user.id)
    const ownerSpots = await Spot.findAll({
        where: { ownerId: req.user.id },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    })
    let Spots = []
    ownerSpots.forEach(spot => {
        Spots.push(spot.toJSON())
    })
    Spots.forEach(spot => {

        spot.SpotImages.forEach(image => {

            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'no preview image found'
        }
        delete spot.SpotImages

    })
    Spots.forEach(spot => {
        let count = 0
        let sum = 0
        spot.Reviews.forEach(review => {
            count++
            sum += review.stars
        })
        if (count === 0) {
            spot.avgRating = 'spot has no reviews'
        } else {
            spot.avgRating = sum / count
        }
        delete spot.Reviews
    })

    res.status(200)
    res.json({ Spots })
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, async) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        if (spot.ownerId === req.user.id) {
            const Bookings = await Booking.findAll({
                where: { spotId: req.params.spotId },
                include: { model: User }
            })
            res.status(200)
            return res.json({ Bookings })
        } else {
            const Bookings = await Booking.findAll({
                where: { spotId: req.params.spotId },
                attributes: ['spotId', 'startDate', 'endDate']
            })
            res.status(200)
            res.json({ Bookings })
        }
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
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

    const reserved = await Booking.findOne({
        // where: { [Op.and]: [{ spotId: req.params.spotId }, { startDate: newStartDate }] }
        where: {
            spotId: req.params.spotId, //[Op.and]: [
            [Op.or]: [
                {
                   startDate: {
                        [Op.between]: [newStartDate, newEndDate]
                    },
                    endDate: {
                        [Op.between]: [newStartDate, newEndDate]
                    }
                }]
        }

    })

    // console.log(reserved)
    for (let each of reserved){
        if ((each.startDate<=newStartDate && each.endDate<=newEndDate)||(each.startDate<=newStartDate)||(each.endDate>=newEndDate)){
            res.status(403)
           return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
    }

    if (spot) {
        // if (!reserved) {
            const booked = await Booking.create({
                spotId: parseInt(spot.id),
                userId: parseInt(req.user.id),
                startDate,
                endDate
            })
            res.status(200)
            res.json(booked)
        // } else {
        //     res.status(403)
        //     res.json({
        //         message: "Sorry, this spot is already booked for the specified dates",
        //         statusCode: 403,
        //         errors: {
        //             startDate: "Start date conflicts with an existing booking",
        //             endDate: "End date conflicts with an existing booking"
        //         }
        //     })
        // }
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})


// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    if (await Spot.findByPk(req.params.spotId)) {
        const Reviews = await Review.findAll({
            where: { spotId: parseInt(req.params.spotId) },
            include: [
                {
                    model: User
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        })

        res.status(200)
        res.json({ Reviews })
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

    }
})


// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', validateReviewData, requireAuth, async (req, res, next) => {
    if (await Spot.findByPk(req.params.spotId)) {

        const existedReview = await Review.findOne({
            where: {
                [Op.and]: [{ spotId: req.params.spotId }, { userId: req.user.id }]
            }
        })
        if (!existedReview) {
            const { review, stars } = req.body
            const rev = await Review.create({
                spotId: parseInt(req.params.spotId),
                userId: req.user.id,
                review,
                stars
            })

            res.status(201)
            res.json(rev)
        } else {
            res.status(403)
            res.json({
                message: "User already has a review for this spot",
                statusCode: 403
            })

        }
    } else {

        res.status(404)
        res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }
})


// Add an Image to a Spot based on the Spot's id===>inquire about the
// statusCode not changing
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        const { url, preview } = req.body
        const image = await SpotImage.create({
            spotId: req.params.spotId,
            url,
            preview
        })
        const data = image.toJSON()
        delete data.spotId
        delete data.updatedAt
        delete data.createdAt

        res.status(200)
        res.json(data)
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

    }
})


// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        await spot.destroy()
        res.status(200)
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})


// Edit a Spot
router.put('/:spotId', validateSpotData, requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const updated = spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })

        res.status(200)
        res.json(spot)
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

    }

})


// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Review
            }
        ]
    })
    if (spot) {
        let result = spot.toJSON()
        let sum = 0
        let count = 0
        result.Reviews.forEach(review => {
            count++
            sum += review.stars
        })

        result.numReviews = count
        if (count === 0) {
            result.avgStarRating = 'spot has no reviews'
        } else {

            result.avgStarRating = sum / count
        }
        delete result.Reviews

        result.Owner = result.User
        delete result.User

        res.status(200)
        res.json(result)
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })


    }
})


// Create a Spot
router.post('/', validateSpotData, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.status(201)
    res.json(newSpot)
})



// Get all Spots
router.get('/', async (req, res, next) => {
    let pagination = {}
    let page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    let size = req.query.size === undefined ? 20 : parseInt(req.query.size);

    if (page > 10) page = 10
    if (size > 20) page = 20
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }


    const spots = await Spot.findAll({
        include: [
            { model: SpotImage },
            { model: Review }
        ],
        limit: pagination.limit,
        offset: pagination.offset
    })
    let spotList = []
    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    });

    spotList.forEach(spot => {
        // console.log(spot.SpotImages)
        spot.SpotImages.forEach(image => {
            // console.log(image.preview)
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'no preview image found'
        }
        delete spot.SpotImages
    })

    spotList.forEach(spot => {
        let count = 0
        let sum = 0
        spot.Reviews.forEach(review => {
            count++
            sum += review.stars
        })
        if (count === 0) {
            spot.avgRating = 'spot has no reviews'
        } else {

            spot.avgRating = sum / count
        }
        delete spot.Reviews
    })
    let Spots = spotList

    res.status(200)
    res.json({ Spots, size, page })
})


module.exports = router;
