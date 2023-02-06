
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBooking } from "../../store/bookings";


import "react-datepicker/dist/react-datepicker.css";
import './index.css'


const BookingForm = ({ setShowBookingForm, spot }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [startDateError, setStartDateError] = useState('')
    const [endDateError, setEndDateError] = useState('');
    const [renderErr, setRenderErr] = useState(false);







    let days = Math.abs(parseInt((+ startDate.toString().slice(8, 11))) - parseInt((+ endDate.toString().slice(8, 11))))
    // console.log('this is days', days)
    if (startDate === endDate) days = 0


    const handleSubmit = async (e) => {
        e.preventDefault()
        setRenderErr(true)
        const payload = { spotId: spot.id, booking: { startDate, endDate } }
        const data = await dispatch(createBooking(payload))
        if (data.errors) {
            // console.log(data.message)
            // console.log(data.errors)
            setShowBookingForm(true)
        } else {
            setShowBookingForm(false)
            history.push('/@me')
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
                        (spot.price * (days === 0 ? 0 : days)).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })
                    }
                </div>

            </div>


            <button className="book">Book</button>
        </form>
    )
}


export default BookingForm
