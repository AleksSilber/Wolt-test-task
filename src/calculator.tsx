import React, { useState } from 'react';
import InputGroup from './components/inputGroup';
import LocationButton from './components/locationButton';
import SubmitButton from './components/SubmitButton';
import Result from './components/Result';
import './calculator.css';

export default function Calculator() {
    const [venueSlug, setVenueSlug] = useState("");
    const [cartValue, setCartValue] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    return (
        <div className='container '>
            <div className='row border rounded my-5 mx-auto position-relative col-xl-7 bg-custom'>
                <div className='my-3 col-12'>
                    <h1 className="text-center fw-bold">Delivery Order Price Calculator</h1>
                </div>
                <hr className='border border-black opacity-25 ' />
                <div className='col-12'>
                    <p className='fs-2 fw-bold mx-2 '>Details</p>
                    <InputGroup name="Venue slug" id="venueSlug" value={venueSlug} onChange={setVenueSlug} />
                    <InputGroup name="Cart Value (EUR)" id="cartValue" value={cartValue} onChange={setCartValue} />
                    <InputGroup name="User latitude" id="userLatitude" value={latitude} onChange={setLatitude} />
                    <InputGroup name="User longitude" id="userLongitude" value={longitude} onChange={setLongitude} />
                    <div className='row'>
                        <LocationButton setLatitude={setLatitude} setLongitude={setLongitude} />
                        <SubmitButton />
                    </div>
                    <Result />
                </div>
            </div>
        </div>
    );
}
