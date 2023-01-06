import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { addReview } from "../../store/reviews";
import './reviewForm.css'



function ReviewFormModal({ setShowForm }) {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [validationErrors, setValidationErrors] = useState([]);
    const [frontErrors, setFrontErrors] = useState([])
    const [test, setTest] = useState(false)

    useEffect(() => {
        const errors = []
        if (review.length > 250) errors.push('Can not exceed 250 characters');
        if (review.length === 0) errors.push("Can not submit and empty Review")
        // setValidationErrors(errors)
        setFrontErrors(errors)
        if (stars > 5 || stars < 1) errors.push('Stars must be a number between 1 and 5')
    }, [review, stars])



    let newReview
    const onsubmit = async (e) => {
        e.preventDefault()

        // const errors = []
        // if (review.length > 250) errors.push('Can not exceed 250 characters');
        // setValidationErrors(errors)


        const payload = {
            review,
            stars,
            id
        }
        // if (!frontErrors) {

        newReview = await dispatch(addReview(payload)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setValidationErrors(frontErrors)
                    setValidationErrors(data.errors)

                    // console.log('====>', data.errors)
                }
            }
        )

        setShowForm(false)
    }





    return (
        <>
            {<form className="review-modal" onSubmit={onsubmit}>
                <label>
                    <textarea
                        placeholder="Review"
                        type='text'
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        required
                    >
                    </textarea>
                </label>
                <button
                    type="submit"
                >submit Review</button>
                <label>

                    <select
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    >
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    Stars
                </label>
                <div className="errors">
                    <ul>
                        {validationErrors.length > 0 && (
                            <>
                                {validationErrors.map((error) => (
                                    <li key={error}>{error}</li>
                                ))}
                            </>
                        )}
                    </ul>
                </div>
            </form>}
        </>
    )
}


export default ReviewFormModal
