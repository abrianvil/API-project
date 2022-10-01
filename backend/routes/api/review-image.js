const express = require('express');
const { Spot, SpotImage, Review, ReviewImage, Booking, User, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Op, json } = require('sequelize');
const router = express.Router();


router.delete('/:imageId', async(req,res,next)=>{
    const imageReview= await ReviewImage.findByPk(req.params.imageId)

    if(imageReview){
        imageReview.destroy()
        res.status(200)
        res.json({
            message: "Successfully deleted",
            statusCode: 200
          })
    }else{
        res.status(404)
        res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
          })
    }
})



module.exports = router;
