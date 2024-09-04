import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import colors from '../theme/colors'
import Box from './Box'

const useStyles = createUseStyles((theme) => ({
    actionsWrapper: ({ rightMargin }) => ({
        background: colors.common.white,
        padding: 8,
        zIndex: 3,
        position: 'absolute',
        right: rightMargin,
        top: 4,
        minWidth: 180,
        borderRadius: 12,
    }),
    transparentOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        overflow: 'visible',
        zIndex: 2,
    },
    action: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1fr auto',
        height: 36,
        padding: 8,
        gridColumnGap: 24,
        '& span': {
            color: colors.common.offBlack,
        },
        '& svg > path ': {
            stroke: colors.common.offBlack,
        },
    },
    hDanger: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: colors.transparency.red.R1,
            transition: theme.transition,
            '& span': {
                transition: theme.transition,
                color: colors.red[500],
            },
            '& svg > path ': {
                transition: theme.transition,
                stroke: colors.red[500],
            },
        },
    },
    hNormal: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: colors.greyscale[200],
            transition: theme.transition,
            '& span': {
                transition: theme.transition,
                color: colors.common.offBlack,
            },
            '& svg > path ': {
                transition: theme.transition,
                stroke: colors.common.offBlack,
            },
        },
    },
}))

const ActionsDropdown = ({
    actions,
    isOpened,
    openToggle,
    rightMargin = 32,
}) => {
    const classes = useStyles({ rightMargin })

    return (
        <>
            {isOpened && (
                <Box classNames={classes.actionsWrapper}>
                    {actions.map(
                        ({ title, icon, callback, hoverType }, index) => (
                            <div
                                className={cx(
                                    classes.action,
                                    hoverType === 'danger'
                                        ? classes.hDanger
                                        : classes.hNormal
                                )}
                                onClick={callback}
                                key={index}
                            >
                                <span>{title}</span>
                                {icon}
                            </div>
                        )
                    )}
                </Box>
            )}
            {isOpened && (
                <div
                    className={classes.transparentOverlay}
                    onClick={openToggle}
                />
            )}
        </>
    )
}

export default ActionsDropdown
