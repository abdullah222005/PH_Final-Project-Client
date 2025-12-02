import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex relative'>
            <img src={logo} alt="" />
            <h1 className='font-semibold text-3xl absolute left-6 top-4'>ZapShift</h1>
        </div>
    );
};

export default Logo;