import {createUseStyles} from 'react-jss'
import {useWindowSize} from '../../hooks/useWindowSize'
import React, {useEffect, useState} from 'react'
import {useLocation,} from 'react-router-dom'

const useStyles = createUseStyles((theme) => ({
    root: {}
}))

const Homepage = () => {
    const {width} = useWindowSize()
    const location = useLocation()
    const [isMobile, setIsMobile] = useState(width <= 448)

    useEffect(() => {

    }, [])

    useEffect(() => {
        setIsMobile(width <= 448)
    }, [width])

    const classes = useStyles()

    return <>
        <h1> 404 </h1>
    </>
}

export default Homepage
