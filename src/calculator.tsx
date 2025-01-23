import React from 'react';
import InputGroup from './components/inputGroup';
import LocationButton from './components/locationButton';
import SubmitButton from './components/submitButton';
import Result from './components/Result';

export default function Calculator() {
    return (
        <div className='container border border-2 border-black w-50 position-relative'>
            <header className='my-4 '>
                <h1 className="text-center fw-bold">Delivery Order Price Calculator</h1>
            </header>
            <hr className='border border-black border-1 opacity-100 width-100' />
            <div>
                <p className='fs-2 fw-bold mx-3 w-25'>Details</p>
                <InputGroup name="Venue slug" id='venueSlug'></InputGroup>
                <InputGroup name="Cart Value (EUR)" id='cartValue'></InputGroup>
                <InputGroup name="User latitude" id='userLatitude'></InputGroup>
                <InputGroup name="User longitude" id='userLongitude'></InputGroup>
                <LocationButton></LocationButton>
                <SubmitButton></SubmitButton>
                <Result></Result>
            </div>
        </div>
    );
};