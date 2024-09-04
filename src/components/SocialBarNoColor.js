import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: {
        ...theme.utils.grid.start,
        ...theme.utils.grid.colFlow,
        ...theme.utils.grid.gapM,
        gridTemplateRows: '1fr',
        '& div': {
            cursor: 'pointer',
        },
        '& svg': {
            width: 40,
        },
    },
}))

const SocialBarNoColor = ({ callBack, icons, className }) => {
    const classes = useStyles({})
    return (
        <div className={cx(classes.root, className)} onClick={callBack}>
            {icons?.map((icon, index) => {
                return <div key={index}>{icon}</div>
            })}
        </div>
    )
}

export default SocialBarNoColor
