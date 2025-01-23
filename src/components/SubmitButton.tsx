import React, { useState } from "react";

function toRadians(degrees: number): number {
    return (Math.PI / 180) * degrees;
}

function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const EARTH_RADIUS = 6371000; // Converted from km to meters
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
    return EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function fetchVenueData(venue: string) {
    try {
        const response = await fetch(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue}/static`);
        return response.json();
    } catch (error) {
        console.error("Error fetching venue data:", error);
    }
}

async function fetchDeliveryPricing(venue: string) {
    try {
        const response = await fetch(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue}/dynamic`);
        return response.json();
    } catch (error) {
        console.error("Error fetching delivery pricing:", error);
    }
}

function updateUI(
    cart: number,
    distance: number,
    basePrice: number,
    minOrderPrice: number,
    distanceRanges: any[],
    setError: (errorMsg: string) => void
) {
    for (const range of distanceRanges) {
        if (distance > range.min && range.max === 0) {
            document.getElementById("result")?.setAttribute("hidden", "")
            setError("Delivery is not available for this distance.");
            return;
        } else if (distance >= range.min && distance <= range.max) {
            setError("");

            const fee = basePrice + range.a + (range.b * distance / 10);
            const orderSurcharge = cart < minOrderPrice / 100 ? minOrderPrice - cart * 100 : 0;
            const totalPrice = cart * 100 + orderSurcharge + fee;

            document.getElementById("CartValue")!.textContent = cart.toFixed(2) + " €";
            document.getElementById("deliveryFee")!.textContent = (fee / 100).toFixed(2) + " €";
            document.getElementById("deliveryDistance")!.textContent = distance.toFixed(0) + " m";
            document.getElementById("smallOrderSurcharge")!.textContent = (orderSurcharge / 100).toFixed(2) + " €";
            document.getElementById("totalPrice")!.textContent = (totalPrice / 100).toFixed(2) + " €";
            document.getElementById("result")?.removeAttribute("hidden")
            return;
        }
    }
}

export default function SubmitButton() {
    const [error, setError] = useState<string>("");

    async function calculateResult() {
        const venueSlug = (document.getElementById("venueSlug") as HTMLInputElement)?.value;
        const cartValue = (document.getElementById("cartValue") as HTMLInputElement)?.value;
        const userLat = (document.getElementById("userLatitude") as HTMLInputElement)?.value;
        const userLon = (document.getElementById("userLongitude") as HTMLInputElement)?.value;

        if (!venueSlug || !cartValue || !userLat || !userLon) {
            document.getElementById("result")?.setAttribute("hidden", "")
            setError("Please fill in all fields.");
            return;
        }

        const venueData = await fetchVenueData(venueSlug);
        if (!venueData) {
            setError("Failed to fetch venue data.");
            return;
        }

        const lat2 = venueData.venue_raw.location.coordinates[1];
        const lon2 = venueData.venue_raw.location.coordinates[0];
        const distance = calculateHaversineDistance(Number(userLat), Number(userLon), lat2, lon2);

        const pricingData = await fetchDeliveryPricing(venueSlug);
        if (!pricingData) {
            setError("Failed to fetch delivery pricing.");
            return;
        }

        const { base_price: basePrice, distance_ranges: distanceRanges } = pricingData.venue_raw.delivery_specs.delivery_pricing;
        const minOrderPrice = pricingData.venue_raw.delivery_specs.order_minimum_no_surcharge;

        updateUI(Number(cartValue), distance, basePrice, minOrderPrice, distanceRanges, setError);
    }

    return (
        <div>

            <button
                className="btn btn-primary m-3"
                onClick={calculateResult}
                type="button"
                data-test-id="calculateDeliveryPrice"
            >
                Calculate
            </button>
            {error && <p className="text-danger mx-2">{error}</p>}
        </div>
    );
}
