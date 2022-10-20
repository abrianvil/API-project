import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { addReview } from "../../store/reviews";
import './reviewForm.css'



function ReviewFormModal({setShowForm}) {
    console.log('======>', setShowForm)
    const { id } = useParams()
    const dispatch = useDispatch()
    // const history = useHistory()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [validationErrors, setValidationErrors] = useState([]);
    // const [showForm, setShowForm]= useState(true)
    // console.log(review)
    // console.log('======>', id)

    useEffect(() => {
        const errors = []
        if (review.length > 200) errors.push('Can not exceed 250 characters');
        if (review.length <= 0) errors.push('Can not submit an empty review');
        setValidationErrors(errors)
    }, [review])

    const onsubmit = async (e) => {

        e.preventDefault()
        const payload = {
            review,
            stars,
            id
        }
        const newReview = await dispatch(addReview(payload)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setValidationErrors([data.errors])
                    // console.log('====>', data.errors)
                }
            });

           if(!validationErrors.length) setShowForm(false)
            console.log('222======>', setShowForm)




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
                    >
                    </textarea>
                </label>
                <button
                    type="submit"
                    disabled={validationErrors.length > 0 ? true : false}
                >submit Review</button>
                <label>
                    Stars
                    <input
                        type='number'
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                    >
                    </input>
                </label>

                <ul>
                    {validationErrors.length > 0 && (
                        <>
                            {validationErrors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </>
                    )}
                </ul>
            </form>}
        </>
    )
}


export default ReviewFormModal
