import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { editASpot } from "../../store/spots";





function UpdateSpotForm() {
    const {id}=useParams()
    const user = useSelector(state => state.session)
    const spotToEdit = useSelector(state => state.spots.one)
    // const spotlist = useSelector(state => state.spots.all)

    // console.log('toedit====>', spotToEdit)
    const dispatch = useDispatch()
    const history = useHistory()

    const [address, setAddress] = useState(spotToEdit.address)
    const [city, setCity] = useState(spotToEdit.city)
    const [state, setState] = useState(spotToEdit.state)
    const [country, setCountry] = useState(spotToEdit.country)
    const [lat, setLat] = useState(spotToEdit.lat)
    const [lng, setLng] = useState(spotToEdit.lng)
    const [name, setName] = useState(spotToEdit.name)
    const [description, setDescription] = useState(spotToEdit.description)
    const [price, setPrice] = useState(spotToEdit.price)
    // const [image, setImage] = useState(spotToEdit.imgUrl)


    const onsubmit = async (e) => {
        e.preventDefault()
        // const id = spotToEdit.id
        const payload = {
            address, city,
            state, country,
            lat, lng,
            name, description,
            price, id
        }
        const updateSpot = await dispatch(editASpot(payload))

        history.push(`/Spots/${+id}`)

    }


    return (
        <div className="container">
            <form className="create" onSubmit={onsubmit}>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>

                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>

                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>

                <label>
                    County
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>

                <label>
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
                </label>

                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>

                {/* <label>
                    Image Url
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </label> */}

                <button disabled={user ? false : true} id="createButton" type="submit">EditSpot</button>
            </form>
        </div>
    )
}


export default UpdateSpotForm
