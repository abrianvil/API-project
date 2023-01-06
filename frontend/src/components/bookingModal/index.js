
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";

import "react-datepicker/dist/react-datepicker.css";
import './index.css'


const BookingForm = ({ setShowBookingForm, spot }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    return (
        <form className="review-modal">
            <label>From</label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <label>To</label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            <button>Book</button>
        </form>
    )
}


export default BookingForm
