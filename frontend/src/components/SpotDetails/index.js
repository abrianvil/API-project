import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getASpot } from '../../store/spots'
import { deleteASpot } from '../../store/spots'
import './SpotDetails.css'



function ShowDetails() {
    const spotDetail = useSelector(state => state.spots.one)
    const [errors,setErrors]= useState()
    const { id } = useParams()
    const dispatch = useDispatch()
    const history=useHistory()

    // console.log('useSelector=====>',spotDetail)
    // console.log("single spot====>", id)

    useEffect(() => {
        dispatch(getASpot(id))
    }, [dispatch, id]);


    const onDelete=async (e)=>{
        e.preventDefault()
        const test= dispatch(deleteASpot(parseInt(id))).catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
              console.log(res)
            }
          );
        if(test){
            history.push('/')
        }else console.log('deletion failed')

    }


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
                        <div>
                            <h3>Home Hosted By {spotDetail.firstName}</h3>
                            <p>{spotDetail.description}</p>
                            <h2>Reviews</h2>
                            <ul>
                                <li>Abel put the reviews here</li>
                            </ul>

                        </div>
                        <fieldset>
                            <div>
                                <h2>${spotDetail.price} night</h2>
                                <p>⭐{spotDetail.avgStarRating} .{spotDetail.numReviews} reviews</p>
                            </div>
                            <button className='buttonGroup'>Add a Review</button>
                            <button className='buttonGroup'>Edit Spot</button>
                            <button onClick={onDelete} className='buttonGroup'>Delete Spot</button>
                        </fieldset>
                    </div>
                </div>}
        </>

    )
}


export default ShowDetails
