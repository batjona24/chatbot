import React, { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1024,
        background: 'rgba(31, 31, 31, 0.1)',
        backdropFilter: 'blur(4px)',
        [theme.mediaQueries.mUp]: {
            top: theme.sizing.headerHeight,
        },
    },
    root: {
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: ({ side, isOpen }) =>
            isOpen && side === 'left'
                ? 0
                : side !== 'left'
                ? 'unset'
                : '-500px',
        right: ({ side, isOpen }) =>
            isOpen && side === 'right'
                ? 0
                : side !== 'right'
                ? 'unset'
                : '-500px',
        height: '100vh',
        width: '100%',
        backgroundColor: theme.palette.common.white,
        zIndex: 1024,
        transition: theme.transition,
        boxShadow:
            '0px 2px 5px rgba(20, 20, 42, 0.1), 0px 0px 2px rgba(20, 20, 42, 0.05)',
        [theme.mediaQueries.mUp]: {
            height: `calc(100vh - ${theme.sizing.headerHeight}px)`,
            maxWidth: 378,
            top: theme.sizing.headerHeight,
        },
    },
}))

const SidePopover = ({
    isOpen = false,
    children,
    className,
    onClose,
    bodyClassName,
    side = 'left',
}) => {
    const classes = useStyles({ isOpen, side })

    useEffect(() => {
        isOpen
            ? (window.document.body.style['overflow-y'] = 'hidden')
            : (window.document.body.style['overflow-y'] = 'auto')
    }, [isOpen])

    return (
        <>
            {isOpen && (
                <div className={cx(classes.overlay)} onClick={onClose} />
            )}
            <div className={cx(classes.root, className)}>
                <div className={bodyClassName}>{children}</div>
            </div>
        </>
    )
}

SidePopover.propTypes = {
    className: PropTypes.string,
    bodyClassName: PropTypes.string,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    overlay: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    side: PropTypes.oneOf(['left', 'right']),
}

export default SidePopover
