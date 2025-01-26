import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputGroup from "../components/inputGroup";

describe("InputGroup Component", () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    test("calls onChange when input value is changed", () => {
        render(<InputGroup id="testInput" name="Test Label" value="" onChange={mockOnChange} />);
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "New Value" } });

        expect(mockOnChange).toHaveBeenCalledWith("New Value");
    });

    test("displays error message when input is empty", async () => {
        render(<InputGroup id="testInput" name="Test Label" value="Valid Input" onChange={mockOnChange} />);
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "" } });

        expect(await screen.findByText("This field is required.")).toBeInTheDocument();
    });

    test("removes error message when valid input is entered", async () => {
        render(<InputGroup id="testInput" name="Test Label" value="Valid Input" onChange={mockOnChange} />);
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "" } });
        expect(await screen.findByText("This field is required.")).toBeInTheDocument();

        fireEvent.change(input, { target: { value: "New Value" } });

        expect(screen.queryByText("This field is required.")).not.toBeInTheDocument();
    });

});
