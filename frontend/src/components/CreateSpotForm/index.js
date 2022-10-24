import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createASpot } from "../../store/spots";
import './createSpotForm.css'




function CreateSpotForm() {
    const user = useSelector(state => state.session)
    const dispatch = useDispatch()
    const history = useHistory()

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState(0)
    const [dis, setDis] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [validationErrors, setValidationErrors] = useState([]);
    const [frontErrors, setFrontErrors] = useState([])


    const urlValidation = str => {
        return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    }

    useEffect(() => {
        let errors = []
        if (price <= 0) errors.push('Price can not be less than 1')
        if (image.length < 0) errors.push('image required')
        if (!urlValidation(image)) errors.push('Invalid url')
        if (city.length > 40) errors.push('City exceeded 40 character limit')
        if (state.length > 40) errors.push('State exceeded 40 character limit')
        if (address.length > 100) errors.push('Address exceeded 100 character limit')
        setDis(true)
        setFrontErrors(errors)
    }, [price, image, city, state])

    const onsubmit = async (e) => {
        e.preventDefault()
        const payload = {
            address, city,
            state, country,
            lat: 10,
            lng: 20,
            name, description,
            price, image
        }

        const newSpot = await dispatch(createASpot(payload)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    // setValidationErrors(frontErrors)
                    setValidationErrors(data.errors, frontErrors)
                    // console.log('====>', data.errors)
                }
            });

        history.push(`/Spots/${newSpot.id}`)


    }


    return (
        <div className="container">
            <form className="create" onSubmit={onsubmit}>
                <div className="errors">

                    <ul>
                        {validationErrors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </div>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    // required
                    />
                </label>

                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    // required
                    />
                </label>

                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    // required
                    />
                </label>

                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    // required
                    />
                </label>

                {/* <label>
                    Latitude
                    <input
                        type="number"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                </label>

                <label>
                    longitude
                    <input
                        type="number"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                    />
                </label> */}

                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    // required
                    />
                </label>

                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    // required
                    />
                </label>

                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    // required
                    />
                </label>

                <label>
                    Image Url
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    required
                    />
                </label>

                <button id="createButton" type="submit">Create Spot</button>
            </form>
        </div>
    )

}
// disabled={validationErrors.length <= 0 ? false : true}

export default CreateSpotForm
