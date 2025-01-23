import React from 'react';

export default function LocationButton() {
    function GetLocation() {
        const lat = document.getElementById("userLatitude");
        const lon = document.getElementById("userLongitude");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        }

        function getPosition(position: any) {
            if (lat && lon) {
                lat?.setAttribute("value", position.coords.latitude.toString());
                lon?.setAttribute("value", position.coords.longitude.toString());
            }

        }
    }
    return (
        <div>
            <button className="btn btn-primary m-3" data-test-id="getLocation" onClick={GetLocation} type="button">Get Location</button>
        </div>
    );
};

