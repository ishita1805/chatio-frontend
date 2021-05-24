import React from 'react'
import Input from '../input/Input'

const Profile = () => {
    return (
        <div className='profile-sidebar'>
            <div className='profile-pic'>
                <i class="fa fa-pen" aria-hidden="true"></i>
            </div>
            <br/>
            <p>User Id</p>
            <Input
            type1="text"
            type2="text"
            icon1="fa fa-pen"
            icon2="fa fa-check"
            placeholder="Enter User Id"
            errortext="User Id cannot be empty"
            />
            <p>Update Password</p>
            <Input
            type1="text"
            type2="text"
            icon1="fa fa-pen"
            icon2="fa fa-check"
            placeholder="Enter Old Password"
            errortext="Password cannot be empty"
            noicon={true}
            />
            <Input
            type1="text"
            type2="text"
            icon1="fa fa-pen"
            icon2="fa fa-check"
            placeholder="Enter New Password"
            errortext="Password cannot be empty"
            noicon={true}
            />
            <button className='new-contact-button'>Update Password</button>
        </div>
    )
}

export default Profile
