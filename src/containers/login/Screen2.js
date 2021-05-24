import React, {useContext, useState } from 'react';
// import {Redirect} from "react-router-dom";
import {MainContext} from '../../context/MainContext';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie'
import axios from 'axios';
import url from '../../url';

const Screen2 = (props) => {
    const { register, handleSubmit, errors } = useForm();
    // const [red,setRed] = useState(false);
    const [pVis,setPVis] = useState(false);
    const { setAuth, setId, setID } = useContext(MainContext);
    
    // for login
    const onSubmit = (data) => {
        axios.post(`${url}/users/login`, data, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
        .then(() => {
            setId(Cookies.get('chat-userid'));
            setID(Cookies.get('chat-id'));
            setAuth(true);
            // setRed(!red);
        })
        .catch((e) => {
            props.error(true);
        })
    }

    return (
        <div className='dark-cont'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <span>WELCOME BACK TO CHAT.IO</span>
                <p className='p'>Login to get started</p>
                {/* {red?<Redirect to='/'/>:null} */}
                <div className='row'>
                    <input type='text' name='userid' placeholder='Enter UserName' ref={register({ required: true })}/>
                </div>
                <span className='error'>{errors.id ? 'User Id Required' : null}</span>
                <div className='row'>
                    <input type={pVis?'text':'password'} name='password' placeholder='Enter Password' ref={register({ required: true })}/>
                    {!pVis?
                    <i className='fa fa-eye' onClick={()=>setPVis(!pVis)}></i>:
                    <i className='fa fa-eye-slash' onClick={()=>setPVis(!pVis)}></i>}
                </div>
                <span className='error'>{errors.pass ? 'Password Required' : null}</span>
                <button className='button-login'>Log In</button>
            </form>
            {props.children}
    </div>
    )
}

export default Screen2
