const express = require('express');
const { Spot, SpotImage, Review, User, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
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
                model:Review
            }
        ]
    })
    if (spot) {
        let result = spot.toJSON()
        let sum=0
        let count=0
        result.Reviews.forEach(review=>{
            count++
           sum+= review.stars
        })

        result.numReviews=count
        result.avgStarRating=sum/count
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



    res.status(200)
    res.json(spotList)
})


module.exports = router;
