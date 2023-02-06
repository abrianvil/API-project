import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllMyBookings, getAllMySpots } from "../../store/myStuff";
import CancelBookingForm from "./cancelBookingModal";
import EditBookingForm from "./editBookingModal";
import { Modal } from '../../context/Modal'
import './index.css'



function MyHome() {
    const dispatch = useDispatch()
    const [showDeleteBooking, setShowDeleteBooking] = useState(false)
    const [showEditBooking, setShowEditBooking]= useState(false)
    const [bookingToEdit,setBookingToEdit]=useState()
    const [bookingToCancel, setBookingToCancel] = useState()

    const bookings = useSelector(state => Object.values(state.portfolio.myBookings))
    const spots = useSelector(state => Object.values(state.portfolio.mySpots))
    bookings.forEach(booking => booking['spotImage'] = booking.Spot.previewImage)
    // console.log('this is bookings', showEditBooking)


    useEffect(() => {
        dispatch(getAllMyBookings())
        dispatch(getAllMySpots())
    }, [dispatch])


    const handleEditBooking=(booking)=>{
        setShowEditBooking(true)
        setBookingToEdit(booking)
    }

    const handleDeleteBooking = (booking) => {
        setShowDeleteBooking(true)
        setBookingToCancel(booking)
    }
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
                                    <div>Price: {spot.price.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })
                                    }
                                    </div>
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
                                    <img className="imgTag" src={booking.spotImage} alt={booking.id} />
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
                                        Total Cost: {(booking.Spot?.price * (parseInt((+ booking.endDate.slice(8, 10))) - parseInt((+ booking.startDate.slice(8, 10))))).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </div>
                                    <div>
                                        <div className="button">
                                            <button onClick={()=>handleEditBooking(booking)}>Edit</button>
                                            <button onClick={() => handleDeleteBooking(booking)}>Cancel</button>
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
            {showDeleteBooking &&
                (<Modal onClose={() => setShowDeleteBooking(false)}>
                    <CancelBookingForm setShowDeleteBooking={setShowDeleteBooking} booking={bookingToCancel}></CancelBookingForm>
                </Modal>)
            }
            {showEditBooking && (
                <Modal onClose={()=>setShowEditBooking(false)}>
                    <EditBookingForm setShowEditBooking={setShowEditBooking} booking={bookingToEdit}></EditBookingForm>
                </Modal>
            )

            }
        </div >
    )

}


export default MyHome
