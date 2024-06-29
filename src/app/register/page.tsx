"use client"
import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
    const [details, setDetails] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const onRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/register', details, {
                withCredentials: true,
              });
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div>
            <input 
                type='email' 
                name='email' 
                placeholder='Email' 
                value={details.email}
                onChange={handleChange}
            />
            <input 
                type='password' 
                name='password' 
                placeholder='Password' 
                value={details.password}
                onChange={handleChange}
            />
            <button onClick={onRegister}>Register</button>
        </div>
    );
}

export default RegisterPage;
