import React from 'react';
import InputGroup from './components/inputGroup';
import LocationButton from './components/locationButton';

export default function calculator() {
    return (
        <div className='container border border-2 border-black w-50 position-relative'>
            <header className='my-4 '>
                <h1 className="text-center fw-bold">Delivery Order Price Calculator</h1>
            </header>
            <hr className='border border-black border-1 opacity-100 width-100'/>
            <div>
                    <p className='fs-2 fw-bold mx-4 w-25'>Details</p>
                    <InputGroup name="Venue slug"></InputGroup>
                    <InputGroup name="Cart Value (EUR)"></InputGroup>
                    <InputGroup name="User latitude" ></InputGroup>
                    <InputGroup name="User longitude"></InputGroup>
                    <LocationButton></LocationButton>
                    <button className="btn btn-primary m-3" type="submit" value="Submit">Calculate</button>
           </div>
        </div>
    );
};