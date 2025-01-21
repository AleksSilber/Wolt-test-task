import React from 'react';

interface InputGroupProps {
    name: string;
}

export default function inputGroup(props: InputGroupProps) {
    return (
        <div className='input-group w-50 mb-4'>
            <label className='fs-4 mx-3 w-75 mb-2'>{props.name}</label>
            <input type='text' className='form-control col-4 mx-3 w-100' id={props.name} required />
        </div>
    );
};