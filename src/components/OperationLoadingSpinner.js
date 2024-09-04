import React, {useEffect} from 'react'
import {createUseStyles, useTheme} from 'react-jss'
import {ClickIcon, ClockIcon} from '../theme/icons'
import Button from "./Button";
import Dot from "./Dot";
import background from '../pages/payment-check/asset/background.png'
import backgroundMobile from '../pages/payment-check/asset/background-mobile.png'
import {useWindowSize} from "../hooks/useWindowSize";
import {useNavigate} from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
    root: {
        ...theme.utils.flexbox.center,
        flexDirection: 'column',
        gap: theme.spacing * 5,
        position: 'fixed',
        maxWidth: '100vw',
        padding: theme.spacing * 2,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#ffffff',
        backdropFilter: 'blur(4px)',
        '-webkit-backdrop-filter': 'blur(4px)',
        zIndex: 2000,
    },
    icon: {
        animation: '$pulse 1.5s ease-in-out infinite',
        '& svg': {
            fill: 'red'
        }
    },
    textWrapper: {
        ...theme.utils.flexbox.center,
        flexDirection: 'column',
        textAlign: 'center',
        gap: theme.spacing,
        maxWidth: 550,
        '& p': {
            letterSpacing: 0.25,
            fontSize: 14,
            [theme.mediaQueries.xsUp]: {
                fontSize: 16,
            },
        }
    },
    title: {
        fontWeight: 700,
        fontSize: 28,
        color: theme.palette.secondary.main,
    },
    action: {
        boxShadow: '0px 24px 20px -15px rgba(107, 45, 102, 0.35)',
        maxWidth: 206,
        maxHeight: 54,
        '& span': {
            letterSpacing: 0.25,
            fontSize: 16,
            fontWeight: 700,
        },
    },
    dotWrapper: {
        ...theme.utils.flexbox.center,
        gap: 6,
    },
    transaction: {
        maxWidth: '100%',
        ...theme.utils.flexbox.center,
        flexDirection: 'column',
        gap: 10,
        '& *': {
            fontSize: 16,
            fontWeight: 400,
            color: theme.palette.primary.main,
            letterSpacing: 0.25,
        },
    },
    banner: {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        borderRadius: 100,
        padding: [11, 25],
        color: theme.palette.tertiary.main,
        backgroundColor: theme.palette.secondary.backgroundLight,
        [theme.mediaQueries.mUp]: {
            maxWidth: 636,
        },
    },
    backgroundContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: 160,
        transform: 'translateY(-50px)',
        zIndex: 1,
        [theme.mediaQueries.mUp]: {
            height: 200,
        },
        [theme.mediaQueries.lUp]: {
            height: 300,
            transform: 'translateY(0px)',
        },
    },
    background: {
        maxHeight: '100%',
        width: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${background})`,
    },
    backgroundMobile: {
        extend: 'background',
        backgroundSize: 'cover',
        width: '100%',
        backgroundImage: `url(${backgroundMobile})`,
    },
    '@keyframes pulse': {
        '0%': {
            transform: 'scale(0.9)',
        },
        '70%': {
            transform: 'scale(1.1)',
        },
        '100%': {
            transform: 'scale(0.9)',
        },
    },
}))

const OperationLoadingSpinner = ({
                                     className,
                                     size = 50,
                                     color = '#333',
                                     strokeLineCap = 'square',
                                     overlay = true,
                                     overlayFullscreen = false,
                                     center = true,
                                     message = ' We are loading your post...',
                                     transactionID,
                                     ...props
                                 }) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const {width} = useWindowSize()
    const isMobile = width < 768

    useEffect(() => {
        window.document.body.style['overflow-y'] = 'hidden' // lock body scroll
        return () => (window.document.body.style['overflow-y'] = 'auto') // unlock body scroll;
    }, [])

    const handleRedirect = () => {
        window.open(`https://bscscan.com/tx/${transactionID}`, '_blank')
    }

    const classes = useStyles({size, overlayFullscreen})
    return (
        <>
            <div className={classes.root} {...props}>
                <div className={classes.icon}>
                    <ClockIcon width={56} stroke={theme.palette.primary.main}/>
                </div>
                <div className={classes.textWrapper}>
                    <div className={classes.title}>
                        Transaction pending
                    </div>
                    <p>
                        We are processing your transaction, usually it takes up to 40 seconds...
                        When the process will be completed you will be redirected to our platform
                    </p>
                </div>
                <Button
                    width={'100%'}
                    icon={<ClickIcon/>}
                    data={'secondary'}
                    className={classes.action}
                    onClick={handleRedirect}
                >
                    View Transaction
                </Button>
                <div className={classes.dotWrapper}>
                    <Dot colorVariant={'primary'}/>
                    <Dot colorVariant={'secondary'}/>
                    <Dot colorVariant={'tertiary'}/>
                </div>
                <div className={classes.transaction}>
                    <p>Transaction ID</p>
                    <div className={classes.banner}>
                        0xb53d4818979da83f4e46eb7376f41039f4ae0cc675f3ec83cab530fbe9adbc77
                        {transactionID}
                    </div>
                </div>
                <div className={classes.backgroundContainer}>
                    {isMobile ?
                        <div className={classes.backgroundMobile}/>
                        :
                        <div className={classes.background}/>
                    }
                </div>
            </div>
        </>
    )
}

export default OperationLoadingSpinner
