import React,{ useState } from 'react'

const Input = (props) => {
    const [pVis, setPVis] = useState(false);
    const [error,setError] = useState(null);

    const func = () => {
        setError(false);
    }

    return (
        <>
        <div className='row-profile'>
        {!pVis?
            <input className='input-profile' type={pVis?props.type1:props.type2} disabled placeholder={props.placeholder}/>:
            <input className='input-profile' type={pVis?props.type1:props.type2}  placeholder={props.placeholder}/>}
            {!props.noicon?
            !pVis?
            <i className={props.icon1} onClick={()=>setPVis(!pVis)}></i>:
            <i className={props.icon2} onClick={()=>setPVis(!pVis)}></i>:null}
        </div>
        <span onClick={func} className='error-profile'>{error?props.errortext:null}</span>
        </>
    )
}

export default Input
