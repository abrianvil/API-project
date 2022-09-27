const express = require('express');
const { Spot, SpotImage, Review, sequelize } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const router = express.Router();


router.use(express.json());



router.get('/current', requireAuth, async (req, res, next) => {

    const ownerSpots = await Spot.findAll({
        where: { ownerId: current }
    })
    res.status(200)
    res.json(ownerSpots)
})



router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: SpotImage, as: 'previewImage',
                where: { preview: true },
                attributes: ['url']
            },
            {
                model: Review,
                attributes: [
                    'stars',
                    // [sequelize.fn("AVG", sequelize.col('stars')), 'avgRating'],
                    //         'review'
                ]
            }
        ],
    })
    res.status(200)
    res.json(spots)
})


module.exports = router;
