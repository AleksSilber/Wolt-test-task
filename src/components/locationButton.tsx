import React from 'react';

interface LocationButtonProps {
    setLatitude: (lat: string) => void;
    setLongitude: (lon: string) => void;
    
}

export default function LocationButton({ setLatitude, setLongitude }: LocationButtonProps) {
    function GetLocation() {
        if (navigator.geolocation) {
            const btn = document.getElementById("getLocation")
            if(btn){
                btn.innerHTML = "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Loading..."
            } 
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude.toString());
                setLongitude(position.coords.longitude.toString());
                if (btn) btn.innerHTML = "Get location";
            });
            
        }
    }

    return (
        <div className='col-6'>
            <button className="btn btn-custom ms-2 mb-2" data-test-id="getLocation" id="getLocation" onClick={GetLocation} type="button">
                Get location
            </button>
        </div>
    );
}
