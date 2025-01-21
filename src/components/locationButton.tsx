import React from 'react';

export default function locationButton() {
    function getLocation() {
        const lat = document.getElementById("User latitude");
        const lon = document.getElementById("User longitude");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }


        function showPosition(position: any) {
            lat?.setAttribute("value", position.coords.latitude.toString())
            lon?.setAttribute("value", position.coords.longitude.toString())
        }
    }
    return (
        <div>
            <button className="btn btn-primary m-3" onClick={getLocation} type="reset">Get Location</button>
        </div>
    );
};

