import React,{ useEffect, useRef, useState } from 'react'
import Input from '../input/Input'
import icons from '../../images'
import './style.css'
import axios from 'axios'
import url from '../../url'

const Profile = () => {
    const [pic,setPic] = useState(false);
    const [oldPass,setOldPass] = useState('');
    const [newPass,setNewPass] = useState('');
    const [error,setError] = useState('')
    const imageRef = useRef();
    const [prev,setPrev] = useState(false);
    const [index,setIndex] = useState();

    const updatePasswordHandler = () => {
        if(oldPass==='' || newPass==='') setError('password feild cannot be empty')
        else {
            console.log('update password endpoint');
        } 
    }

    const imagePreview = () => {
        imageRef.current.click();
        setPic(!pic);
    }

    const prevHandler = () => {
        setPrev(true);
    }

    const imageUpload = () => {
        setPic(!pic)
        console.log('update photo endpoint');
    }

    useEffect(() => {
        console.log('get user info');
        axios.get(`${url}/users/user`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
        .then((resp) => {
            console.log(resp.data.resp);
            setIndex(resp.data.resp.photoNum);
        })
        .catch((e) => {
            console.log(e);
        })
    },[])

    return (
        <div className='profile-sidebar'>
            <input type='file' onChange={prevHandler} style={{ display:'none' }} ref={imageRef} />
            <div className='profile-pic'>
                {
                    prev?
                    <img className='profile-image' alt='profile' src={imageRef.current?URL.createObjectURL(imageRef.current.files[0]):null}/>
                    :
                    <img className='profile-image' alt='profile' src={icons[index]}/>
                }
            
                {
                    !pic?
                    <i class="fa fa-pen" onClick={imagePreview} aria-hidden="true"></i>:
                    <i class="fa fa-check" onClick={imageUpload} aria-hidden="true"></i>
                }
            </div>
            <br/>
            <p>User Id</p>
            <Input
            type1="text"
            type2="text"
            icon1="fa fa-pen"
            icon2="fa fa-check"
            placeholder="Enter User Id"
            val=''
            errortext="User Id cannot be empty"
            />
            <p>Update Password</p>
            <Input
            type1="password"
            pass={true}
            val={(e)=>{if(e!=='') setError('');setOldPass(e)}}
            
            name='old-p'
            icon1="fa fa-pen"
            icon2="fa fa-check"
            placeholder="Enter Old Password"
            noicon={true}
            />
            <Input
            type1="password"
            pass={true}
            icon1="fa fa-pen"
            val={(e)=>{if(e!=='') setError('');setNewPass(e)}}
            data={newPass}
            name='new-p'
            icon2="fa fa-check"
            placeholder="Enter New Password"
           
            noicon={true}
            />
            <button className='new-contact-button' onClick={updatePasswordHandler}>Update Password</button>
            {
                error !== ''?
                <span className='error-profile'>{error}</span>
                :null
            }
        </div>
    )
}

export default Profile
