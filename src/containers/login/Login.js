import React, { useState, useEffect } from 'react';
import SignupComp from './Screen1';
import LoginComp from './Screen2';
import img from '../../assets/logo1.png'

const Login = () => {
    const [error, setError] = useState(false); // use this in api catch call
    const [reg, setReg] = useState(false);
    
    useEffect(() => {
       setError(false);
    }, [reg])

    return (
        <div className='logo-container'>
        <img className='logo-main' src={img} alt='logo'/>
        {
            reg?
            <SignupComp error={()=>setError(true)}>
                {error?<p className='error-big'>Error Signing In</p>:null}
                <p className='login-link'>Already a member? <span className='login-link pink' onClick={()=>setReg(!reg)}>Login Instead</span></p>
            </SignupComp>:
            <LoginComp error={()=>setError(true)}>
                {error?<p className='error-big'>Error Logging in</p>:null}
                <p className='login-link'>Not a member yet? <span className='login-link pink' onClick={()=>setReg(!reg)}>Signup Instead</span></p>
            </LoginComp>
        }
        <span className='footer-login'>
            <span className='footer-item'>Home</span>|
            <span className='footer-item'>Contact</span>|
            <span className='footer-item'>Help</span>
        </span>
        </div>
    )
        
}

export default Login
