import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../store/bookings";
import { getAllMyBookings } from "../../store/myStuff";

import './index.css'


const CancelBookingForm = ({ setShowDeleteBooking, booking }) => {
    const dispatch= useDispatch()

    const handleConfirm=async()=>{
        await dispatch(deleteBooking(booking.id))
        await dispatch( getAllMyBookings())
        setShowDeleteBooking(false)
    }

    return (
        <form className="cancel-form">
            <div className="title">Are you sure you want to cancel this Booking?</div>
            <div className="yes-no">
                <div onClick={()=>handleConfirm()}>YES</div>
                <div onClick={()=>setShowDeleteBooking(false)} >NO</div>
            </div>
        </form>
    )
}


export default CancelBookingForm
