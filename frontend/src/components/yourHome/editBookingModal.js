
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
// import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBooking } from "../../store/bookings";
import { getAllMyBookings } from "../../store/myStuff";


import "react-datepicker/dist/react-datepicker.css";
import './index.css'


const EditBookingForm = ({ setShowEditBooking, booking }) => {
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date(booking.startDate));
    const [endDate, setEndDate] = useState(new Date(booking.endDate));

    const [startDateError, setStartDateError] = useState('')
    const [endDateError, setEndDateError] = useState('');
    const [renderErr, setRenderErr] = useState(false);







    let days = Math.abs(parseInt((+ startDate.toString().slice(8, 11))) - parseInt((+ endDate.toString().slice(8, 11))))
    // console.log('this is days', days)
    if (startDate === endDate) days = 0


    const handleSubmit = async (e) => {
        e.preventDefault()
        setRenderErr(true)
        const payload = { id: booking.id, startDate, endDate }
        const data = await dispatch(updateBooking(payload))
        await dispatch(getAllMyBookings())
        // console.log('this is data in Modal', data)
        if (data.errors) {
            // console.log(data.message)
            // console.log(data.errors)
            setShowEditBooking(true)
        } else {
            setShowEditBooking(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="booking-modal">
            <div className="title">Book Spot</div>
            <div className="dates">
                <label>From</label>
                <DatePicker
                    className="dateField"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)} />
                <label>To</label>
                <DatePicker
                    className="dateField"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)} />
            </div>
            <div>
                <label>Total for {days} Nights:</label>
                <div className="price">
                    {
                        (booking.Spot.price * (days === 0 ? 0 : days)).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })
                    }
                </div>

            </div>

            <div className="button-box">
                <button className="book">Edit Booking</button>
                <div className="book one"
                onClick={()=>setShowEditBooking(false)}
                >Cancel</div>
            </div>

        </form>
    )
}


export default EditBookingForm
