import React from 'react'
import './style.css'

const ModalContact = (props) => {
    return (
        <div className='modal-fixed-bg'>
            <div className='Add-Contact-Form'>
                <div className='row-end'>
                    <p>{props.legend}</p>
                    <i className='fa fa-times' onClick={()=>props.close(true)}></i>
                </div>
               {props.children}
            </div>
        </div>
    )
}

export default ModalContact
