import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SubmitButton from "../components/SubmitButton";
import Result from "../components/Result";

global.fetch = jest.fn() as jest.Mock;

describe("SubmitButton Component", () => {
    let consoleErrorMock: jest.SpyInstance;
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
        document.body.innerHTML = "";
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        consoleErrorMock.mockRestore();
    });

    test("shows error when fields are empty", async () => {
        render(<SubmitButton />);
        fireEvent.click(screen.getByRole("button", { name: "calculate price" }));

        await waitFor(() => {
            expect(screen.queryByText("Please fill in all fields.")).toBeInTheDocument();
        });
    });

    test("shows error when invalid data is entered", async () => {
        document.body.innerHTML = `
            <input id="venueSlug" value="test-venue" />
            <input id="cartValue" value="invalid" />
            <input id="userLatitude" value="invalid" />
            <input id="userLongitude" value="invalid" />
        `;

        render(<SubmitButton />);
        fireEvent.click(screen.getByRole("button", { name: "calculate price" }));

        await waitFor(() => {
            expect(screen.queryByText("provide valid information")).toBeInTheDocument();
        });
    });

    test("shows error when fetching venue data fails", async () => {
        document.body.innerHTML = `
            <input id="venueSlug" value="test-venue" />
            <input id="cartValue" value="10" />
            <input id="userLatitude" value="60.1699" />
            <input id="userLongitude" value="24.9384" />
        `;
    
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch venue data"));
    
        render(<SubmitButton />);
        fireEvent.click(screen.getByRole("button", { name: "calculate price" }));
    
        await waitFor(() => {
            expect(screen.queryByText("Failed to fetch venue data.")).toBeInTheDocument();
        });
    });
    
    test("shows error when fetching delivery pricing fails", async () => {
        document.body.innerHTML = `
            <input id="venueSlug" value="test-venue" />
            <input id="cartValue" value="10" />
            <input id="userLatitude" value="60.1699" />
            <input id="userLongitude" value="24.9384" />
        `;
    
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    venue_raw: { location: { coordinates: [24.9384, 60.1699] } },
                }),
        });
    
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch delivery pricing"));
    
        render(<SubmitButton />);
        fireEvent.click(screen.getByRole("button", { name: "calculate price" }));
    
        await waitFor(() => {
            expect(screen.queryByText("Failed to fetch delivery pricing.")).toBeInTheDocument();
        });
    });

    test("calculates and updates UI when valid data is provided", async () => {
        document.body.innerHTML = `
            <input id="venueSlug" value="test-venue" />
            <input id="cartValue" value="5" />
            <input id="userLatitude" value="60.1699" />
            <input id="userLongitude" value="24.9384" />
            <div id="result" hidden></div>
            <div id="CartValue"></div>
            <div id="deliveryFee"></div>
            <div id="deliveryDistance"></div>
            <div id="smallOrderSurcharge"></div>
            <div id="totalPrice"></div>
        `;
    
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    venue_raw: { location: { coordinates: [24.9384, 60.1699] } },
                }),
        });
    
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    venue_raw: {
                        delivery_specs: {
                            delivery_pricing: {
                                base_price: 150,
                                distance_ranges: [{ min: 0, max: 5000, a: 50, b: 10 }],
                            },
                            order_minimum_no_surcharge: 1000,
                        },
                    },
                }),
        });
    
        render(<SubmitButton />);
        const button = screen.getByRole("button", { name: "calculate price" });
        fireEvent.click(button);
    
        await waitFor(() => {
            expect(button.innerHTML).toContain("Loading");
        });
    
        await waitFor(() => {
            expect(document.getElementById("result")).not.toHaveAttribute("hidden");
            expect(document.getElementById("CartValue")).toHaveAttribute("data-raw-value", "500");
            expect(document.getElementById("deliveryFee")).toHaveAttribute("data-raw-value", "200");
            expect(document.getElementById("deliveryDistance")).toHaveAttribute("data-raw-value", "0");
            expect(document.getElementById("smallOrderSurcharge")).toHaveAttribute("data-raw-value", "500");
            expect(document.getElementById("totalPrice")).toHaveAttribute("data-raw-value","1200");
        });
    
        await waitFor(() => {
            expect(button.innerHTML).toBe("calculate price");
        });
    });

    test("shows error when delivery is not available for the distance", async () => {
        document.body.innerHTML = `
            <input id="venueSlug" value="test-venue" />
            <input id="cartValue" value="10" />
            <input id="userLatitude" value="60.1699" />
            <input id="userLongitude" value="24.9384" />
        `;

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    venue_raw: { location: { coordinates: [25.9384, 61.1699] } },
                }),
        });

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    venue_raw: {
                        delivery_specs: {
                            delivery_pricing: {
                                base_price: 100,
                                distance_ranges: [{ min: 0, max: 1000, a: 50, b: 10 }, { min: 1001, max: 0, a: 100, b: 10 }],
                            },
                            order_minimum_no_surcharge: 1000,
                        },
                    },
                }),
        });

        render(<SubmitButton />);
        fireEvent.click(screen.getByRole("button", { name: "calculate price" }));

        await waitFor(() => {
            expect(screen.getByText("Delivery is not available for this distance.")).toBeInTheDocument();
        });
    });
});
