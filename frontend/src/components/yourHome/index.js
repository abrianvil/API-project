import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllMyBookings, getAllMySpots } from "../../store/myStuff";
import './index.css'


function MyHome() {
    const dispatch = useDispatch()

    const bookings = useSelector(state => Object.values(state.portfolio.myBookings))
    const spots = useSelector(state => Object.values(state.portfolio.mySpots))

    useEffect(() => {
        dispatch(getAllMyBookings())
        dispatch(getAllMySpots())
    }, [dispatch])

    return (
        <div className='main-container'>
            <div className="mySpots">
                <label>My Spots</label>
                {spots.length > 0 ? (

                    spots.map(spot => (
                        <div className="ind-spot" key={spot.id}>
                            <div className="nav" >
                                <NavLink to={`/Spots/${spot.id}`}>
                                    <img className="imgTag" src={`${spot.previewImage}`} alt={spot.name}></img>
                                </NavLink>
                                <div className="info">
                                    <div className="name">
                                        {spot.name}
                                    </div>
                                    <div>{spot.description}</div>
                                    <div className="address">{spot.address},{spot.city} {spot.state}</div>
                                    <div>Price: {spot.price}</div>
                                </div>
                            </div>
                        </div>
                    ))

                ) :
                    (
                        <div className="ind-spot">
                            <div>YOU DO NOT OWN ANY SPOT</div>
                        </div>
                    )
                }
            </div>

            <div className="myBookings">
                <label>My Bookings</label>
                {bookings.length > 0 ? (
                    bookings.map(booking => (
                        <div className="ind-spot" key={booking.id}>
                            <div className="nav" >
                                <NavLink to={`/Spots/${booking.Spot?.id}`}>
                                    <img className="imgTag" src={booking.Spot?.previewImage} alt={booking.Spot?.state} />
                                </NavLink>
                                <div className="info">
                                    <div className="name">
                                        {booking.Spot?.name}
                                    </div>
                                    <div>
                                        From: {booking.startDate.slice(0, 10)} - To: {booking.endDate.slice(0, 10)}
                                    </div>
                                    <div>
                                        <div className="address">{booking.Spot?.address},{booking.Spot?.city} {booking.Spot?.state}</div>
                                    </div>
                                    <div>
                                        Total Cost: {booking.Spot?.price * (parseInt((+ booking.endDate.slice(8, 10))) - parseInt((+ booking.startDate.slice(8, 10))))}
                                    </div>
                                    <div>
                                        <div className="button">
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) :
                    (
                        <div className="ind-spot">
                            <div>NO BOOKINGS</div>
                        </div>
                    )
                }
            </div >
        </div >
    )

}


export default MyHome
