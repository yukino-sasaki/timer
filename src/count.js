import React, { useContext } from 'react';
import { Store } from './App'
import Style from './count.module.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    reset: {
        width: "100px",
        fontSize: '20px',
    }
})

const Count = (props) => {
    const classes = useStyles()

    const { setPause } = useContext(Store)

    return (
        <div className={props.pause ? Style.show : Style.unshow}>
            <div className={Style.layer}>
                <div className={Style.countContent}>
                    <div className={Style.radius}>
                        <p className={props.current && props.count !== -1 ? Style.number_work : Style.unshow}>{props.count}</p>
                        <p className={props.current || props.rest === -1 ? Style.unshow : Style.number_rest}>{props.rest}</p>
                    </div>
                    <p className={Style.number_size}>{props.loop}</p>
                    <div className={Style.resetButton}>
                        <Button variant="outlined" color="inherit" className={classes.reset} onClick={() => setPause(false)}>reset</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Count