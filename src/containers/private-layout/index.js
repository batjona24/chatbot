import { createUseStyles } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../components/Alert'
import {
    selectAlertMessage,
    toggleAlert,
} from '../../store/slices/app'
import { useWindowSize } from '../../hooks/useWindowSize'
import { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'

const useStyles = createUseStyles((theme) => ({
    root: {
        height:'100%',
        width:'100%,'
    },
    body: {
        width: '100%',
        height: '100%',
    },
    alerts: {
        pointerEvents: 'none',
        position: 'fixed',
        top: 68,
        left: 8,
        right: 8,
        zIndex: 1300,
        [theme.mediaQueries.mUp]: {
            top: 132,
        },
    },
}))

const PrivateLayout = ({ withHeader }) => {
    const dispatch = useDispatch()

    const {
        variant: alertVariant,
        message: alertMessage,
        title: alertTitle,
        visible: alertVisbile,
    } = useSelector(selectAlertMessage)

    const { width } = useWindowSize()
    const [isMobile, setIsMobile] = useState(width <= 448)
    useEffect(() => {
        setIsMobile(width <= 448)
    }, [width])

    const classes = useStyles({withHeader})

    return (
        <div className={classes.root}>
            <div className={classes.alerts}>
                {alertVisbile && (
                    <Alert visible={alertVisbile} variant={alertVariant} message={alertMessage}
                        title={alertTitle} dismissTimeout={5000}
                        dismissCallback={() =>
                            dispatch(toggleAlert({ visible: false }))
                        }
                    />
                )}
            </div>
            <div className={classes.body}>
                <Outlet />
            </div>
        </div>
    )
}

export default PrivateLayout
