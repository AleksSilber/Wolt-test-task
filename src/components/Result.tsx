import React from "react";



export default function Result() {
    return (
        <div className="container my-4 col-12" id="result" hidden>
            <hr></hr>
            <p className='fs-2 fw-bold'>Price breakdown</p>
            <div className="row fs-4 mb-3">
                <div className="col-5">
                    Cart value
                </div>
                <div className="col-2"></div>
                <div className="col-5 text-end" data-raw-value="" id="CartValue">

                </div>
            </div>
            <div className="row fs-4 mb-3">
                <div className="col-5">
                    Delivery fee
                </div>
                <div className="col-2"></div>
                <div className="col-5 text-end" data-raw-value="" id="deliveryFee">

                </div>
            </div>
            <div className="row fs-4 mb-3">
                <div className="col-5">
                    Delivery distance
                </div>
                <div className="col-2"></div>
                <div className="col-5 text-end" data-raw-value="" id="deliveryDistance">

                </div>
            </div>
            <div className="row fs-4 mb-3">
                <div className="col-7">
                    Small order surcharge
                </div>
                <div className="col-1"></div>
                <div className="col-4 text-end" data-raw-value="" id="smallOrderSurcharge">

                </div>
            </div>
            <div className="row fs-4 mb-3">
                <div className="col-5">
                    Total price
                </div>
                <div className="col-2"></div>
                <div className="col-5 text-end" data-raw-value="" id="totalPrice" >

                </div>
            </div>
        </div>
    );
};