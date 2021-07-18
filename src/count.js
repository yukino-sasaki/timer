import React, { useContext } from 'react';
import { Store } from './App'
import Style from './count.module.css'
import Button from '@material-ui/core/Button';

const Count = (props) => {

    const { pause, setPause } = useContext(Store)

    console.log(props.rest)

    return (
        <div className={props.pause ? Style.show : Style.unshow}>
            <div className={Style.layer}>
                <div className={Style.countContent}>
                    <div >
                        <p className={props.current && props.count !== -1 ? Style.number_work : Style.unshow}>{props.count}</p>
                        <p className={props.current || props.rest === -1 ? Style.unshow : Style.number_rest}>{props.rest}</p>
                        <p className={Style.number_size}>{props.roop}</p>
                    </div>
                    <div className={Style.resetButton}>
                        <Button color="inherit" onClick={() => setPause(false)}>reset</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Count