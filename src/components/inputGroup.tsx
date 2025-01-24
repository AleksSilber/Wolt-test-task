import React, { useState, useEffect } from 'react';

interface InputGroupProps {
    id: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
}

export default function InputGroup({ id, name, value, onChange }: InputGroupProps) {
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (value) {
            setError("");
        }
    }, [value]);

    const validateInput = (value: string) => {
        if (!value) return "This field is required.";
        return "";
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setError(validateInput(newValue));
        onChange(newValue);
    };

    return (
        <div className='input-group mb-4'>
            <div className='fs-4 mx-2 col-12'>{name}</div>
            <input
                type='text'
                className='form-control mx-2 input-volumetric rounded'
                data-test-id={id}
                id={id}
                value={value}
                onChange={handleChange}
            />
            {error && <p className='text-danger mx-3 mb-0 col-12'>{error}</p>}
        </div>
    );
}
