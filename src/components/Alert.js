import { createUseStyles, useTheme } from 'react-jss'
import { useEffect } from 'react'
import cx from 'classnames'
import {app} from '../utilities/constants'
import {
    CloseIcon,
    DoneIcon,
    AlertWarningIcon,
    AlertErrorIcon
} from '../theme/icons'

const useStyles = createUseStyles((theme) => ({
    root: {
        pointerEvents: 'auto',
        margin: '0 auto 8px auto',
        zIndex: 1301,
        padding: [16],
        maxWidth: 1156,
        borderRadius: 12,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTop: `2px solid`,
        borderColor: ({ variantStyle }) => variantStyle.color,
        color: ({ variantStyle }) => variantStyle.color,
        backgroundColor: ({ variantStyle }) => variantStyle.backgroundColor,
        transition: 'transform 0.2s ease-in-out',
        willChange: 'transform',
        [theme.mediaQueries.mUp]: {
            margin: '0 auto 16px auto',
            right: 'auto',
            left: '50%',
            padding: [12, theme.spacing * 2],
            maxWidth: 800,
            minWidth: 400,
        },
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
    },
    content: {
        gridColumnStart: 2,
        display: 'flex',
        flexDirection: 'column',
        marginRight: 16,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 700,
    },
    message: {
        wordBreak: 'break-word',
    },
    action: {},
    icon: {
        display: 'flex',
        marginRight: 16,
        alignItems:"center"
    },
    closeIcon: {
        cursor:"pointer",
        gridColumnStart: 3,
        '& svg': {
            maxHeight: 20,
            '& path': {
                fill: ({ variantStyle }) => variantStyle.closeIconColor,
            },
        },
    },
    in: {
        transform: `translateY(0)`,
        [theme.mediaQueries.xsUp]: {
            transform: `translateY(calc(0))`,
        },
    },
    out: {
        transform: 'translateY(-1000%)',
        [theme.mediaQueries.xsUp]: {
            transform: 'translateY(-1000%)',
        },
    },
}))

const getVariantStyle = (variant, theme) => {
    switch (variant) {
        case app.SUCCESS:
            return {
                color: theme.palette.success.main,
                backgroundColor: theme.palette.success.background,
                closeIconColor: theme.palette.success.main,
                icon: <DoneIcon data-color width={22} height={22} fill={theme.palette.success.main}/>,
            }
        case app.FAILURE:
            return {
                color: theme.palette.error.main,
                backgroundColor: theme.palette.error.background,
                closeIconColor: theme.palette.error.main,
                icon: <AlertErrorIcon data-color width={22} height={22} fill={theme.palette.error.main}/>,
            }
        default:
            return {
                color: theme.palette.warning.main,
                backgroundColor: theme.palette.warning.background,
                closeIconColor: theme.palette.warning.main,
                icon: <AlertWarningIcon data-color width={22} height={22} fill={theme.palette.warning.main}/>,
            }
    }
}

const Alert = ({
    visible,
    title,
    message,
    actionCallback,
    dismissTimeout,
    canDismiss = true,
    dismissCallback,
    variant = app.FAILURE,
    withLeftIcon = false,
    closeIcon = <CloseIcon width={22} height={22}/>,
}) => {
    const theme = useTheme()
    const variantStyle = getVariantStyle(variant, theme)
    const classes = useStyles({ variantStyle })

    useEffect(() => {
        if (dismissTimeout && visible) {
            const timeoutId = setTimeout(() => {
                closeHandler()
            }, +dismissTimeout)
            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [visible])

    const closeHandler = () => {
        dismissCallback && dismissCallback()
    }

    return (
        <div className={cx(classes.root, visible ? classes.in : classes.out)}>
            <div className={classes.container}>
                {withLeftIcon && <span className={classes.icon}>{variantStyle.icon}</span>}
                <div className={classes.content}>
                    {title && <span className={classes.title}>{title}</span>}
                    {message && (
                        <span className={classes.message}>{message}</span>
                    )}
                    {actionCallback && <span className={classes.action} />}
                </div>
                {canDismiss && (
                    <span className={classes.closeIcon} onClick={closeHandler}>
                        {closeIcon}
                    </span>
                )}
            </div>
        </div>
    )
}

export default Alert
