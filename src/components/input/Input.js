import React,{ useState } from 'react'

const Input = (props) => {
    const [pVis, setPVis] = useState(false);
    const [error,setError] = useState(null);
    const [val,setVal] = useState(props.val)

    const func = () => {
        setError(false);
    }


    const updateData = () => {
        if(val === '') setError(true);
        else {
            setPVis(!pVis);
            console.log('update input endpoint');
        }
    }


    if(!props.pass) return (
        <>
        <div className='row-profile'>
        {!pVis?
            <input className='input-profile' value={val} type={pVis?props.type1:props.type2} disabled placeholder={props.placeholder}/>:
            <input className='input-profile' value={val} onChange={(e)=>{func();setVal(e.target.value)}} type={pVis?props.type1:props.type2}  placeholder={props.placeholder}/>
        }
        {!props.noicon?
            !pVis?
            <i className={props.icon1} onClick={()=>setPVis(!pVis)}></i>:
            <i className={props.icon2} onClick={updateData}></i>
        :null}
        </div>
        <span className='error-profile'>{error?props.errortext:null}</span>
        </>
    ) 
    else return (
        <>
        <div className='row-profile-2'>
        <input className='input-profile' value={props.data} onChange={(e)=>{props.val(e.target.value)}} type={props.type1}  placeholder={props.placeholder}/>
        </div>
      
        </>
    )
}

export default Input
