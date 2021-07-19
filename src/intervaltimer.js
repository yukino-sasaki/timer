import React, { useEffect, useState, useRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Style from './timer.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Count from './count'
import { Store } from './App'
import RestAudio from './sound/Onmtp-Ding01-1.mp3'
import WorkAudio from './sound/Onmtp-Ding05-3.mp3'
import FinishAudio from './sound/Onmtp-Inspiration11-1.mp3'

const useStyles = makeStyles({
    button: {
        height: '50px'
    }
})



const Timer = () => {
    const restAudio = new Audio(RestAudio)
    const workAudio = new Audio(WorkAudio)
    const finishAudio = new Audio(FinishAudio)


    const { pause, setPause } = useContext(Store)

    const [count, setCount] = useState(20)
    const [rest, setRest] = useState(10)
    const [loop, setloop] = useState(3)
    //今の状態
    const [current, setCurrent] = useState(true)



    const countRef = useRef(null)
    const restRef = useRef(null)
    const startRef = useRef(null)
    const startRestRef = useRef(null)

    const classes = useStyles()


    const stop = () => {
        clearInterval(countRef.current)
        clearInterval(restRef.current)
        setCurrent(true)
        setPause(false)
    }

    const start = () => {
        startRef.current = count
        startRestRef.current = rest
        setPause(true)

    }

    //スタートする関数
    const startCount = () => {
        countRef.current = setInterval(() => {
            setCount(c => c - 1)

        }, 1000)
    }

    const resthandle = () => {
        restRef.current = setInterval(() => {
            setRest(c => c - 1)
        }, 1000)

    }

    //countを追うuseEffect
    useEffect(() => {
        if (count === 0 && loop === 0) {
            finishAudio.play()
        }
        else if (count === -1 && loop === 0) {
            stop()
            alert("Finished")
        } else if (count === 0) {
            workAudio.play()
        }
        else if (count === -1) {
            setRest(startRestRef.current)
            clearInterval(countRef.current)
            resthandle()
            setCurrent(false)
            /* restRef.current = setInterval(() => {
                setRest(c => c - 1)
            }, 1000) */

        }

    }, [count])

    useEffect(() => {
        if (rest === 0) {
            restAudio.play()
        }
        if (rest === -1) {
            clearInterval(restRef.current)
            setCount(startRef.current)
            startCount()
            setloop(c => c - 1)
            setCurrent(true)
        }


    }, [rest])

    useEffect(() => {
        if (pause) {
            return
        } else {
            stop()
            /* setCount(startRef.current)
            setRest(startRestRef.current) */
        }
    }, [pause])

    useEffect(() => {
        if (!pause) {
            setCount(20)
            setRest(10)
            setloop(3)
        }
    }, [pause])


    const plus = () => {
        setCount(c => c + 1)
    }

    const minus = () => {
        if (count <= 1)
            return
        setCount(c => c - 1)
    }

    const restPlus = () => {
        setRest(c => c + 1)
    }

    const restMinus = () => {
        if (rest <= 1)
            return
        setRest(c => c - 1)
    }

    const loopPlus = () => {
        setloop(c => c + 1)
    }

    const loopMinus = () => {
        if (loop <= 0)
            return
        setloop(c => c - 1)
    }








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
                            <p className={Style.text}>loop</p>
                            <div className={Style.timer_number}>

                                <Button className={classes.button} onClick={() => { loopPlus() }}>+</Button>
                                <p className={Style.timer_count}>{loop}</p>
                                <Button className={classes.button} onClick={() => { loopMinus() }}>-</Button>
                            </div>
                        </div>
                    </div>
                    <div className={Style.text}>


                        <Button variant="contained" color="primary" onClick={() => { start(); startCount() }}>Start</Button>

                    </div>
                </div>
            </div>
            <Count count={count} rest={rest} loop={loop} pause={pause}
                currentCount={startRef.current} currentRest={startRestRef.current} current={current} />

        </>

    )
}

export default Timer