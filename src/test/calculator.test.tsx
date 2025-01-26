
import React from 'react';
import {render, screen} from '@testing-library/react';
import Calculator from '../calculator';
describe('Calculator Component', () => {
    test('renders all input fields and buttons', async () => {
        render(<Calculator />);
        expect(await screen.getByText('Delivery Order Price Calculator')).toBeInTheDocument();
        expect(await screen.getByText('Venue slug')).toBeInTheDocument();
        expect(await screen.getByText('Cart Value (EUR)')).toBeInTheDocument();
        expect(await screen.getByText('User latitude')).toBeInTheDocument();
        expect(await screen.getByText('User longitude')).toBeInTheDocument();
        expect(await screen.getByText('Get location')).toBeInTheDocument();
        expect(await screen.getByText('calculate price')).toBeInTheDocument();
    });
});