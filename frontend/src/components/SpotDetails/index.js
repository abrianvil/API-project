import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getASpot } from '../../store/spots'
import './SpotDetails.css'



function ShowDetails() {
    const spotDetail = useSelector(state => state.spots.one)
    const { id } = useParams()
    const dispatch = useDispatch()

    // console.log('useSelector=====>',spotDetail)
    // console.log("single spot====>", id)

    useEffect(() => {
        dispatch(getASpot(id))
    }, [dispatch, id]);



    //DISPATCH TO GET REVIEWS NEEDED
    return (
        <>
            {spotDetail &&
                <div>

                    <div>
                        <h2>{spotDetail.name} </h2>
                        {/* <h4></h4> */}
                    </div>
                    <div className='image'>
                        <img src={spotDetail.imgUrl} alt={spotDetail.name} />
                    </div>
                    <div>

                        <h3>Home Hosted By {spotDetail.firstName}</h3>
                        <p>{spotDetail.description}</p>
                    </div>
                </div>}
        </>

    )
}


export default ShowDetails
