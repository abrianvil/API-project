const express = require('express');
const { Spot, SpotImage, Review, sequelize } = require('../../db/models')
const router = express.Router();


router.use(express.json());







router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: SpotImage, as: 'previewImage',
                // where: { preview: true },
                attributes: ['url']
            },
            {
                model: Review,
                // attributes: [
                    // [sequelize.fn("AVG", sequelize.col('stars')), 'avgRating'],
            //         // 'review'
                // ]
            }
        ],


    })
    res.status(200)
    res.json(spots)
})


module.exports = router;
