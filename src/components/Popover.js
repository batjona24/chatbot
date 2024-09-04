import React, {useEffect, useRef} from 'react'
import {createUseStyles} from 'react-jss'
import cx from 'classnames'
import PropTypes from 'prop-types'
import {CloseIcon} from '../theme/icons'
import {useWindowSize} from "../hooks/useWindowSize"

const useStyles = createUseStyles((theme) => ({
    overlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(31, 31, 31, 0.1)',
        backdropFilter: 'blur(4px)',
        '-webkit-backdrop-filter': 'blur(4px)',
        zIndex: theme.zIndex.modalOverlay,
    },
    root: ({maxWidth}) => ({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.spacing * 2,
        width: `calc(100% - ${theme.spacing * 2}px)`,
        zIndex: theme.zIndex.modal,
        maxWidth: maxWidth,
        maxHeight: `calc(100% - ${theme.spacing * 2}px)`,
    }),
    header: ({
        title,
        headerFontWeight,
        headerFontSize,
    }) => ({
        ...(title
            ? {
                ...theme.utils.flexbox.spaceBetween,
                borderBottom: `1px solid ${theme.palette.grey[300]}`,
            }
            : {...theme.utils.flexbox.end}
        ),
        minHeight: theme.spacing * 8,
        fontSize: headerFontSize,
        fontWeight: headerFontWeight,
        color: theme.palette.secondary.darker,
        padding: theme.spacing * 2,
        '& svg': {
            cursor: 'pointer',
            height: theme.spacing * 3,
            fill: theme.palette.secondary.darker
        },
    }),
    body: ({
        pageHeight,
        maxHeight,
        hideScrollbar,
        headerHeight,
        actionsHeight,
    }) => ({
        overflowY: 'auto',
        maxHeight: maxHeight ?? (pageHeight - headerHeight - actionsHeight - (theme.spacing * 2)),
        '&::-webkit-scrollbar': {
            display: hideScrollbar ? 'none' : 'block',
            width: theme.spacing,
            background: theme.palette.grey[200],
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[400],
            borderRadius: theme.spacing,
            '&:hover': {
                backgroundColor: theme.palette.grey[600]
            }
        }
    }),
    actions: {
        minHeight: theme.spacing * 8,
        padding: theme.spacing * 2,
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    }
}))

const Popover = ({
    children,
    onClose,
    className,
    bodyClassName,
    actionsClassName,
    maxWidth,
    maxHeight,
    title,
    actionsComponent: Actions,
    headerFontSize = 18,
    headerFontWeight = 700,
    hideScrollbar,
    closeOnOverlay = true,
}) => {
    const {height: pageHeight} = useWindowSize()
    const headerRef = useRef()
    const actionsRef = useRef()

    useEffect(() => {
        window.document.body.style['overflow-y'] = 'hidden' // lock body scroll
        return () => (window.document.body.style['overflow-y'] = 'auto') // unlock body scroll;
    }, [])

    const classes = useStyles({
        maxWidth,
        maxHeight,
        pageHeight,
        title,
        headerFontSize,
        headerFontWeight,
        headerHeight: headerRef?.current?.scrollHeight || 0,
        actionsHeight: actionsRef?.current?.scrollHeight || 0,
        hideScrollbar,
    })

    return (
        <>
            <div
                className={classes.overlay}
                {...(closeOnOverlay && {onClick: onClose})}
            />
            <div className={cx(classes.root, className)}>
                <header
                    className={classes.header}
                    ref={headerRef}
                >
                    {title}
                    <CloseIcon onClick={onClose}/>
                </header>
                <div className={cx(classes.body, bodyClassName)}>
                    {children}
                </div>
                {!!Actions &&
                    <div
                        className={cx(classes.actions, actionsClassName)}
                        ref={actionsRef}
                    >
                        <Actions/>
                    </div>
                }
            </div>
        </>
    )
}

Popover.propTypes = {
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    bodyClassName: PropTypes.string,
    actionsClassName: PropTypes.string,
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.any,
    actionsComponent: PropTypes.element,
    headerFontWeight: PropTypes.number,
    headerFontSize: PropTypes.number,
    hideScrollbar: PropTypes.bool,
    closeOnOverlay: PropTypes.bool,
}

export default Popover
