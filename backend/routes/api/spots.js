const express = require('express');
const { Spot, SpotImage, Review, User, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router();


router.use(express.json());


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    console.log(req.user.id)
    const ownerSpots = await Spot.findAll({
        where: { ownerId: req.user.id }
    })
    res.status(200)
    res.json(ownerSpots)
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
        result.avgStarRating = sum / count
        delete result.Reviews

        result.Owner = result.User
        delete result.User

        res.status(200)
        res.json(result)
    } else {
        res.status(404)
        res.json(
            {
                message: "Spot couldn't be found",
                statusCode: 404
            }
        )
    }
})


// Create a Spot=====>Error handler missing

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


router.post('/',validateSpotData, async (req, res, next) => {
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
    const spots = await Spot.findAll({
        include: [
            { model: SpotImage },
            { model: Review }
        ],
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
        spot.avgRating = sum / count
        delete spot.Reviews
    })


    res.status(200)
    res.json(spotList)
})


module.exports = router;
