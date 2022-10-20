import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getASpot } from '../../store/spots'
import { Modal } from '../../context/Modal'
import { deleteASpot } from '../../store/spots'
import { clearState } from '../../store/spots'
import { reset } from '../../store/reviews'
import { deleteReview } from '../../store/reviews'
import ReviewFormModal from '../reviewFormModal'
import './SpotDetails.css'



function ShowDetails() {
    const [showForm, setShowForm] = useState(false)
    const [toDelRev, setToDelRev]=useState()
    const review= useSelector(state=>state.reviews.spotReviews)
    const spotDetail = useSelector(state => state.spots.one)
    const user = useSelector(state => state.session)
    const [errors, setErrors] = useState()
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    // console.log('useSelector=====>', spotDetail)
    // console.log("user====>", user)

    useEffect(() => {
        dispatch(getASpot(+id))
        return (
            () => dispatch(clearState())
        )
    }, [dispatch, id]);


    useEffect(() => {
        dispatch(getAllSpotReviews(+id))
        return(
            ()=>dispatch(reset())
        )
    }, [dispatch, id]);


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
                console.log(res)
            }
        );
        if (test) {
            history.push('/')
        } else console.log('deletion failed')

    }


    const reviewhandler=(review)=>async(e)=>{
        e.preventDefault()
        dispatch(deleteRev(review.id, id))

    }

    const deleteRev=async(e)=>{
        e.preventDefault()
        console.log('********',id)
       await dispatch(deleteReview(toDelRev,id))``
    }
    console.log('======>',toDelRev)



    //DISPATCH TO GET REVIEWS NEEDED
   return (
        <>
            {spotDetail &&
                <div className='detailsMainDiv'>

                    <div>
                        <h2>{spotDetail.name} </h2>
                    </div>
                    <div className='image'>
                        <img src={spotDetail.imgUrl} alt={spotDetail.name} />
                    </div>
                    <div className='description-card'>
                        <div className='info-box'>
                            <div>
                                <h3>Home Hosted By {spotDetail.firstName}</h3>
                                <p>{spotDetail.description}</p>
                            </div>
                            <div>
                                <h3>Self check-in</h3>
                                <p>Check yourself in with the lockbox.</p>
                            </div>
                            <div className='review-box'>
                                <h2>Reviews</h2>
                                <ul>

                                    {reviewsArr.map(review => {

                                        return (
                                            <div key={review.id} className='indiv-review'>
                                                <li>
                                                    {review.review}
                                                    <button
                                                    type='submit'
                                                    hidden={user&&user.id===review.userId?false:true}
                                                    onClick={()=>setToDelRev(review.id)}
                                                    onSubmit={deleteRev}
                                                    >
                                                        delete
                                                    </button>
                                                </li>
                                            </div>
                                        )
                                    })}
                                </ul>

                            </div>


                        </div>
                        <fieldset>
                            <div className='priceReview'>
                                <h2>${spotDetail.price} night</h2>
                                <p>⭐{spotDetail.avgStarRating} .{spotDetail.numReviews} reviews</p>
                            </div>
                            <h3>Free cancellation</h3>
                            <button className='buttonGroup' onClick={() => setShowForm(true)}>Add a Review</button>
                            {showForm && (<Modal onClose={() => setShowForm(false)} id='review-form'>
                                <ReviewFormModal setShowForm={setShowForm} />
                            </Modal>)}
                            <button hidden={(user&&user.id === spotDetail.ownerId ? false : true)}
                                onClick={onEdit}
                                className='buttonGroup'>Edit Spot
                            </button>

                            <button hidden={(user&&user.id === spotDetail.ownerId ? false : true)}
                                onClick={onDelete} className='buttonGroup'>Delete Spot
                            </button>
                        </fieldset>
                    </div>
                </div>}
        </>

    )

}


export default ShowDetails
