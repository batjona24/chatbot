import React from 'react'
import { createUseStyles } from 'react-jss'
import { FacebookColorIcon, GoogleIcon, TwitterColorIcon } from '../theme/icons'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: {
        ...theme.utils.grid.center,
        ...theme.utils.grid.colFlow,
        gridColumnGap: theme.spacing * 3,
        gridTemplateRows: '1fr',
    },
    item: {
        ...theme.utils.grid.center,
        cursor: 'pointer',
        width: 56,
        height: 56,
        border: '1px solid',
        borderColor: theme.palette.disabled.light,
        borderRadius: '50%',
        '& svg': {
            width: 28,
        },
    },
}))

const SocialBarColor = ({ callBack, className }) => {
    const classes = useStyles({})
    return (
        <div className={cx(classes.root, className)} onClick={callBack}>
            <div className={classes.item}>
                <GoogleIcon />
            </div>
            <div className={classes.item}>
                <FacebookColorIcon />
            </div>
            <div className={classes.item}>
                <TwitterColorIcon />
            </div>
        </div>
    )
}

export default SocialBarColor
