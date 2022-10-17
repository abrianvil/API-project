import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import './splashPage.css'



function SplashPage() {
    const spotsObj = useSelector(state => state.spots)
    const spots = Object.values(spotsObj)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpots())
        console.log("spots====>", spotsObj)
    }, [dispatch]);


    return (
        <div className="spotBox" >
            {spots.map(spot => {
                return (
                    <div className="pictureCard">
                        <img src={`${spot.previewImage}`} alt={spot.name}></img>
                        <p>
                            <div className="namePrice">
                                <h3>{spot.name}</h3>
                                <h3>{spot.avgRating}</h3>
                            </div>

                            <h4>{spot.city}</h4>
                            <h4>${spot.price} night</h4>
                        </p>
                    </div>
                )
            })}
        </div>
    )
}


export default SplashPage
