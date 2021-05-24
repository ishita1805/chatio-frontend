import React,{ useState } from 'react'
import './carousel.css'

const Carousel = (props) => {
    const [inx, setInx] = useState(props.inx);
    const [images, setImages] = useState(props.images);

    const imgRight = () => {
        if(inx+1===images.length) setInx(0);
        else setInx(inx+1);
    }
    const imgLeft = () => {
        if(inx-1<0) setInx(images.length-1);
        else setInx(inx-1);
    }
  
    return (
        <div className='modal-fixed-bg-2'>
            <div className='carousel-holder'>
                <i  onClick={()=>props.close(true)} className='fa fa-times cross-img'></i>
                <div className='image-holder'>
                    <i className='fa fa-chevron-left' onClick={imgLeft}></i>
                    <img alt='media' src={images[inx].file}/>
                    <i className='fa fa-chevron-right' onClick={imgRight}></i>
                </div>
                <p>Image {inx+1} of {images.length}</p>
            </div>
        </div>
    )
}

export default Carousel
