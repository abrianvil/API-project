import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { getAllMyBookings, getAllMySpots } from "../../store/myStuff";
import './splashPage.css'



function SplashPage() {
    const spotsObj = useSelector(state => state.spots.all)

    // console.log("spotObj splashPage===>",spotsObj)
    // console.log('1')
    let spots = []
    if (spotsObj) {
        spots = Object.values(spotsObj)
    }


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpots())
        dispatch(getAllMyBookings())
        dispatch(getAllMySpots())
    }, [dispatch]);


    return (

        <div className="spot-Box" >
            {spots.map(spot => {
                return (
                    <div className="picture-Card" key={spot.name}>
                        <nav >
                            <NavLink className="navEdit" to={`/Spots/${spot.id}`}>
                                <div >
                                    <img className="imgDiv" src={`${spot.previewImage}`} alt={spot.name}></img>
                                </div>
                                <div className="namePrice">
                                    <h4>{spot.name}</h4>
                                    <h4>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        {spot.avgRating}
                                    </h4>
                                </div>
                                <p>{spot.city}, {spot.state}</p>
                                <h4>{spot.price.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })
                                } night</h4>

                            </NavLink>
                        </nav>
                    </div>
                )
            })}
        </div >

    )
}


export default SplashPage
