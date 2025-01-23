import React from "react";



export default function Result() {
    return (
        <div className="container my-4" id="result" hidden>
            <p className='fs-2 fw-bold mx-3 w-50'>Price breakdown</p>
            <div className="row fs-4 mx-3  mb-3 justify-content-around">
                <div className="col-4">
                    Cart value
                </div>
                <div className="col-6"></div>
                <div className="col-2" data-raw-value="" id="CartValue">

                </div>
            </div>
            <div className="row fs-4 mx-3  mb-3 justify-content-around">
                <div className="col-4">
                    Delivery fee
                </div>
                <div className="col-6"></div>
                <div className="col-2" data-raw-value="" id="deliveryFee">

                </div>
            </div>
            <div className="row fs-4 mx-3  mb-3 justify-content-around">
                <div className="col-4">
                    Delivery distance
                </div>
                <div className="col-6"></div>
                <div className="col-2" data-raw-value="" id="deliveryDistance">

                </div>
            </div>
            <div className="row fs-4 mx-3 mb-3 justify-content-around">
                <div className="col-6">
                    Small order surcharge
                </div>
                <div className="col-4"></div>
                <div className="col-2" data-raw-value="" id="smallOrderSurcharge">

                </div>
            </div>
            <div className="row fs-4 mx-3  mb-3 justify-content-around">
                <div className="col-4">
                    Total price
                </div>
                <div className="col-6"></div>
                <div className="col-2" data-raw-value="" id="totalPrice" >

                </div>
            </div>
        </div>
    );
};