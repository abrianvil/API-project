import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import './splashPage.css'



function SplashPage() {
    const spotsObj = useSelector(state => state.spots.all)

    // console.log("spotObj splashPage===>",spotsObj)
    // console.log('1')
    let spots = []
    if (spotsObj) {
        spots = Object.values(spotsObj)
    }
    // console.log('2')
    // console.log("spots splashPage===>", spots)
    // console.log('3')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpots())
        // console.log("spots====>", spotsObj)
    }, [dispatch]);


    return (
        <div className="spotBox" >
            {spots.map(spot => {
                return (
                    <div className="pictureCard" key={spot.name}>
                        <nav >
                            <NavLink className="navEdit" to={`/Spots/${spot.id}`}>
                                <div className="imgDiv">
                                    <img src={`${spot.previewImage}`} alt={spot.name}></img>
                                </div>
                                <div className="namePrice">
                                    <h4>{spot.name}</h4>
                                    <h4>⭐{spot.avgRating}</h4>
                                </div>
                                <p>{spot.city}, {spot.state}</p>
                                <h4>${spot.price} night</h4>

                            </NavLink>
                        </nav>
                    </div>
                )
            })}
        </div >
    )
}


export default SplashPage
