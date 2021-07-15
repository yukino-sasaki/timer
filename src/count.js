import React, { useEffect } from 'react';


import Style from './count.module.css'

const Count = (props) => {

    console.log(props.pause)
    useEffect(() => {
        props.setPause(false)
    }, [props.setPause, props.pause])


    return (
        <div className={props.pause ? Style.show : Style.unshow}>
            <div className={Style.layer}>
                <div className={Style.countContent}>
                    <div>{props.count}</div>
                    <div>{props.rest}</div>
                    <div>{props.roop}</div>
                    <button onClick={props.reset()}>reset</button>
                </div>
            </div>
        </div>
    )
}

export default Count