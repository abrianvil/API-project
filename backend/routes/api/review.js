const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Op } = require('sequelize');
const router = express.Router();




const validateReviewData = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];




// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    if (await Review.findByPk(req.params.reviewId)) {
        const { url } = req.body
        const imageReview = await ReviewImage.create({
            reviewId: parseInt(req.params.reviewId),
            url
        })
        let data = imageReview.toJSON()
        delete data.reviewId
        delete data.createdAt
        delete data.updatedAt


        res.status(200)
        res.json(data)
    } else {
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })

    }
})




// Edit a Review
router.put('/:reviewId', validateReviewData, requireAuth, async (req, res, next) => {
    const { review, stars } = req.body
    const currReview = await Review.findByPk(req.params.reviewId)
    if (currReview) {
        currReview.update({
            review,
            stars
        })
        res.status(200)
        res.json(currReview)
    } else {

        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
})



// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const allReviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [
            { model: User },
            { model: Spot },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    let Reviews = []
    allReviews.forEach(el => Reviews.push(el.toJSON()))

    for (let review of Reviews) {
        let getPreview = await SpotImage.findOne({
            where: { [Op.and]: [{ spotId: review.Spot.id }, { preview: true }] }
        })
        review.Spot.previewImage = getPreview.url
        delete review.Spot.description
        delete review.Spot.createdAt
        delete review.Spot.updatedAt
    }
    // let Reviews=allReviews
    res.status(200)
    res.json({ Reviews })
})



// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)
    if (review) {
        review.destroy()
        res.status(200)
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
})





module.exports = router;
