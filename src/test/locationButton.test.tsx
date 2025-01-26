import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LocationButton from '../components/locationButton';

const mockGeolocation = {
    getCurrentPosition: jest.fn()
};

(global.navigator as any).geolocation = mockGeolocation;

describe('LocationButton Component', () => {
    const setLatitudeMock = jest.fn();
    const setLongitudeMock = jest.fn();

    beforeEach(() => {
        setLatitudeMock.mockClear()
        setLongitudeMock.mockClear();
        mockGeolocation.getCurrentPosition.mockImplementation((successCallback, errorCallback) => {
            if (typeof successCallback === 'function') {
                successCallback({ coords: { latitude: 60.1695, longitude: 24.9354 } });
            }
        });
    });

    test('calls navigator.geolocation.getCurrentPosition when button is clicked', async () => {
        render(<LocationButton setLatitude={setLatitudeMock} setLongitude={setLongitudeMock} />);
        
        const button = screen.getByText("Get location");
        fireEvent.click(button);

        await waitFor(() => expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled());
    });

    test('updates latitude and longitude state on successful location fetch', async () => {
        render(<LocationButton setLatitude={setLatitudeMock} setLongitude={setLongitudeMock} />);

        const button = screen.getByText("Get location");
        fireEvent.click(button);

        await waitFor(() => {
            expect(setLatitudeMock).toHaveBeenCalledWith('60.1695');
            expect(setLongitudeMock).toHaveBeenCalledWith('24.9354');
        });
    });

    test('handles geolocation error gracefully', async () => {
        mockGeolocation.getCurrentPosition.mockImplementationOnce((_, errorCallback) => {
            if (typeof errorCallback === 'function') {
                errorCallback(new Error('Geolocation error'));
            }
        });

        render(<LocationButton setLatitude={setLatitudeMock} setLongitude={setLongitudeMock} />);

        const button = screen.getByText("Get location");
        fireEvent.click(button);

        await waitFor(() => {
            expect(setLatitudeMock).not.toHaveBeenCalled();
            expect(setLongitudeMock).not.toHaveBeenCalled();
        });
    });
});
