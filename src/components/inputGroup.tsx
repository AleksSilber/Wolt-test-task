import React, { useState } from 'react';

interface InputGroupProps {
    id: string;
    name: string;
}

export default function InputGroup(props: InputGroupProps) {
    const [Name, setName] = useState('');


    return (
        <div className='input-group w-50 mb-4'>
            <label className='fs-4 mx-3 w-75 mb-2'>{props.name}</label>
            <input type='text' className='form-control col-4 mx-3 w-100' data-test-id={props.id} id={props.id} value={Name} onChange={e => setName(e.target.value)} />
        </div>
    );
};