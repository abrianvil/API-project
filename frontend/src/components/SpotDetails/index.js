import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getASpot } from '../../store/spots'
import { Modal } from '../../context/Modal'
import { deleteASpot, clearState } from '../../store/spots'
import { deleteReview, reset, getAllSpotReviews } from '../../store/reviews'
import { getAllBookings } from '../../store/bookings'
import ReviewFormModal from '../reviewFormModal'
import BookingForm from '../bookingModal'
import './SpotDetails.css'



function ShowDetails() {
    const [showForm, setShowForm] = useState(false)
    const [showBookingForm, setShowBookingForm] = useState(false)
    const [toDelRev, setToDelRev] = useState(null)

    const review = useSelector(state => state.reviews.spotReviews)
    const reviewsArr = Object.values(review)
    const bookings = useSelector(state => state.bookings)
    // console.log('this is bookings', bookings)
    const spotDetail = useSelector(state => state.spots.one)
    const user = useSelector(state => state.session)
    const [errors, setErrors] = useState()
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    // console.log('useSelector=====>', spotDetail)
    // console.log("user====>", user)
    let alreadyReviewed;
    if (user) alreadyReviewed = reviewsArr.find(review => review.User.id === user.id)
    let spotOwner;
    if (user) spotOwner = spotDetail.ownerId === user.id

    useEffect(() => {
        dispatch(getASpot(+id))
        dispatch(getAllBookings(+id))
        return (
            () => dispatch(clearState())
        )
    }, [dispatch, id]);


    useEffect(() => {
        dispatch(getAllSpotReviews(+id))
        return (
            () => dispatch(reset())
        )
    }, [dispatch, id]);


    useEffect(() => {
        if (toDelRev !== null) dispatch(deleteReview(toDelRev, id))
        setToDelRev(null)

    }, [dispatch, toDelRev]);

    const onEdit = async (e) => {
        e.preventDefault()
        history.push(`/spots/${spotDetail.id}/edit`)
    }

    const onDelete = async (e) => {
        e.preventDefault()
        const test = dispatch(deleteASpot(parseInt(id))).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                // console.log(res)
            }
        );
        if (test) {
            history.push('/')
        } else console.log('deletion failed')

    }


    // const reviewhandler = (review) => async (e) => {
    //     e.preventDefault()
    //     dispatch(deleteRev(review.id, id))

    // }

    // const deleteRev = async (e) => {
    //     e.preventDefault()
    //     console.log('********', id)
    //     await dispatch(deleteReview(toDelRev, id))``
    // }
    // console.log('======>', toDelRev)



    //DISPATCH TO GET REVIEWS NEEDED
    return (
        <>
            {spotDetail &&
                <div className='detailsMainDiv'>

                    <div>
                        <h2>{spotDetail.name} </h2>
                    </div>
                    <div className='image-cont'>
                        <div className='image'>
                            <img src={spotDetail.imgUrl} alt={spotDetail.name} />
                        </div>
                    </div>

                    <div className='description-card'>
                        <div className='info-box'>
                            <div>
                                <h3>Home Hosted By {spotDetail.firstName}</h3>
                                <p>{spotDetail.description}</p>
                            </div>
                            <div className='amenities-box'>
                                <h3>Self check-in</h3>
                                <p>Check yourself in with the lockbox.</p>
                            </div>
                            <div className='review-box'>
                                <h2>Reviews</h2>
                                {reviewsArr.length > 0 && (<div className='review-container'>

                                    {reviewsArr.map(review => {

                                        return (
                                            <div key={review.id} className='indiv-review'>
                                                <div id='reviewName'>
                                                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                                                    <h5>{review.User.firstName}</h5>
                                                </div>
                                                {review.review}
                                                <button
                                                    className='del-rev'
                                                    hidden={user && user.id === review.userId ? false : true}
                                                    onClick={() => setToDelRev(review.id)}
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>)}
                                {reviewsArr.length === 0 && (<div> There are no Reviews for this spot</div>)}

                            </div>


                        </div>
                        <div >

                            <fieldset>
                                <div className='priceReview'>
                                    <h2>{spotDetail.price?.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })
                                    } night</h2>
                                    <p>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        {spotDetail.avgStarRating} .{spotDetail.numReviews} reviews
                                    </p>
                                </div>
                                <div className='fieldset-icon'>
                                    <i className="fa fa-wifi" aria-hidden="true"></i>
                                    <h5>Free wifi</h5>
                                </div>

                                <div className='fieldset-icon'>
                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                    <h5>Free cancellation</h5>
                                </div>

                                <div className='fieldset-icon'>
                                    <i className="fa fa-wheelchair" aria-hidden="true"></i>
                                    <h5>Wheelchair accessible</h5>
                                </div>

                                {user && (<button
                                    className='buttonGroup'
                                    onClick={() => setShowBookingForm(true)}
                                >Book Spot</button>)}
                                {showBookingForm && (
                                    <Modal onClose={() => setShowBookingForm(false)}>
                                        <BookingForm setShowBookingForm={setShowBookingForm} spot={spotDetail} />
                                    </Modal>
                                )}

                                <button
                                    className='buttonGroup'
                                    hidden={(!spotOwner && !alreadyReviewed && user) ? false : true}
                                    onClick={() => setShowForm(true)}
                                >Add a Review</button>
                                {showForm && (<Modal onClose={() => setShowForm(false)} id='review-form'>
                                    <ReviewFormModal setShowForm={setShowForm} />
                                </Modal>)}

                                <button
                                    hidden={(user && user.id === spotDetail.ownerId ? false : true)}
                                    onClick={onEdit}
                                    className='buttonGroup'>Edit Spot
                                </button>

                                <button
                                    hidden={(user && user.id === spotDetail.ownerId ? false : true)}
                                    onClick={onDelete} className='buttonGroup'>Delete Spot
                                </button>

                            </fieldset>
                        </div>
                    </div>
                </div>}
        </>

    )

}


export default ShowDetails
