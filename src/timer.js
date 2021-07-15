import React, { useEffect, useState, useRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Style from './timer.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Count from './count'

const useStyles = makeStyles({
    button: {
        height: '50px'
    }
})



const Timer = () => {



    const [count, setCount] = useState(20)
    const [rest, setRest] = useState(5)
    const [roop, setRoop] = useState(2)
    const [pause, setPause] = useState(false)
    //タイマーのりレンダリングを防ぐためのuseEffectの引数にしようと思ってるやつ


    const countRef = useRef(null)
    let restRef = useRef(null)
    const startRef = useRef(null)
    const startRestRef = useRef(null)

    const classes = useStyles()


    const stop = () => {
        clearInterval(countRef.current)
        clearInterval(restRef.current)
        console.log("stophandler")
        setPause(false)
    }

    const start = () => {
        startRef.current = count
        startRestRef.current = rest
        setPause(true)

    }

    const startCount = () => {
        countRef.current = setInterval(() => {
            setCount(c => c - 1)

        }, 1000)
    }

    const resthandle = () => {
        //startRestRef.current = rest
        restRef.current = setInterval(() => {
            setRest(c => c - 1)
        }, 1000)

    }


    useEffect(() => {
        if (count === 0 && roop === 0) {
            stop()
        }
        else if (count === 0) {
            setRest(startRestRef.current)
            clearInterval(countRef.current)
            resthandle()

            /* restRef.current = setInterval(() => {
                setRest(c => c - 1)
            }, 1000) */

        }

    }, [count, roop])

    useEffect(() => {
        if (rest === 0) {
            clearInterval(restRef.current)
            setCount(startRef.current)
            startCount()
            setRoop(c => c - 1)
        }


    }, [rest])


    const plus = () => {
        setCount(c => c + 1)
    }

    const minus = () => {
        setCount(c => c - 1)
    }

    const restPlus = () => {
        setRest(c => c + 1)
    }

    const restMinus = () => {
        setRest(c => c - 1)
    }

    const roopPlus = () => {
        setRoop(c => c + 1)
    }

    const roopMinus = () => {
        setRoop(c => c - 1)
    }


    /* useEffect(() => {
        isFirstRender.current = true
    }, []) */
    /*  useEffect(() => {
         if (isFirstRender === true) {
             isFirstRender.current = false
         } else {
             countTimer()
         }
 
     }, [limit]) */




    return (
        <>
            <div className={Style.timer_items}>
                <div className={Style.timer_inner_items}>
                    <div className={Style.timer_line}>
                        <div >
                            <p className={Style.text}>work out</p>
                            <div className={Style.timer_number}>

                                <Button className={classes.button} onClick={() => { plus() }}>+</Button>
                                <p className={Style.timer_count}>{count}</p>
                                <Button className={classes.button} onClick={() => { minus() }}>-</Button>
                            </div>
                        </div>
                        <div >
                            <p className={Style.text}>rest</p>
                            <div className={Style.timer_number}>
                                <Button className={classes.button} onClick={() => { restPlus() }}>+</Button>
                                <p className={Style.timer_count}>{rest}</p>
                                <Button className={classes.button} onClick={() => { restMinus() }}>-</Button>
                            </div>
                        </div>
                        <div >
                            <p className={Style.text}>roop</p>
                            <div className={Style.timer_number}>

                                <Button className={classes.button} onClick={() => { roopPlus() }}>+</Button>
                                <p className={Style.timer_count}>{roop}</p>
                                <Button className={classes.button} onClick={() => { roopMinus() }}>-</Button>
                            </div>
                        </div>
                    </div>
                    <div className={Style.text}>

                        {pause ? <Button variant="contained" color="secondary" onClick={() => stop()}>Reset</Button> :
                            <Button variant="contained" color="primary" onClick={() => { start(); startCount() }}>Start</Button>
                        }
                    </div>
                </div>
            </div>
            <Count count={count} rest={rest} roop={roop} pause={pause} reset={() => stop()}
                setPause={setPause} />
        </>

    )
}

export default Timer