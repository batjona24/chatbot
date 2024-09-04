import {createUseStyles, useTheme} from 'react-jss'
import React, {useEffect, useRef, useState} from 'react'
import {ArrowDownIcon} from '../theme/icons'
import cx from 'classnames'
import PropTypes from "prop-types"

const useStyles = createUseStyles((theme) => ({
    root: {
        width: "100%",
        ...theme.card,
        padding: 0
    },
    head: {
        ...theme.utils.flexbox.spaceBetween,
        gap: `${theme.spacing * 2}px`,
        padding: theme.spacing * 3,
        ...theme.clickable,
    },
    title: {
        ...theme.utils.flexbox.start,
        gap: `${theme.spacing}px`,
        overflow: "hidden",
        '& h5': {
            ...theme.utils.truncateText
        },
        '& svg': {
            width: theme.spacing * 3
        }
    },
    body: ({
        open,
        bodyHeight,
        animated
    }) => ({
        height:
            open
                ? animated
                    ? bodyHeight
                    : "100%"
                : 0,
        overflow: "hidden",
        ...(animated && {transition: theme.transition}),
        '& > div': {
            padding: theme.spacing * 3,
            height:
                animated
                    ? bodyHeight
                    : "100%",
            overflow: "auto"
        }
    })
}))

const Accordion = ({
    children,
    className,
    headClassName,
    bodyClassName,
    animated = true,
    defaultOpen = false,
    title,
    icon,
    ...rest
}) => {
    const theme = useTheme()
    const [open, setOpen] = useState(defaultOpen)
    const bodyRef = useRef()
    const [bodyHeight, setBodyHeight] = useState(null)

    const classes = useStyles({
        open,
        bodyHeight,
        animated
    })

    useEffect(() => {
        setBodyHeight(bodyRef.current?.scrollHeight)
    }, [])

    return (
        <div
            className={cx(classes.root, className)}
            {...rest}
        >
            <div
                className={cx(classes.head, headClassName)}
                onClick={() => setOpen(prevState => !prevState)}
            >
                <div className={classes.title}>
                    {icon}
                    <h5>
                        {title}
                    </h5>
                </div>
                <ArrowDownIcon
                    width={16}
                    fill={theme.palette.common.black}
                    style={{
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        ...(animated && {transition: theme.transition /*same of classes.body transition*/})
                    }}
                />
            </div>
            <div
                className={cx(classes.body, bodyClassName)}
                ref={bodyRef}
            >
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Accordion

Accordion.propTypes = {
    className: PropTypes.string,
    headClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    animated: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    title: PropTypes.string,
    icon: PropTypes.element
}