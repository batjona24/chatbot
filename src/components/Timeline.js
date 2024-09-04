import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { BrandFilledIcon, BrandIcon } from '../theme/icons'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { setSignupStatus } from '../store/slices/user'
import { useDispatch } from 'react-redux'

const useStyles = createUseStyles((theme) => ({
    root: {
        ...theme.utils.grid.center,
        ...theme.utils.grid.colFlow,
        gridTemplateColumns: ({ stepNames }) =>
            `repeat(${stepNames.length}, 60px)`,
        gridColumnGap: theme.spacing * 6,

        [theme.mediaQueries.xxsUp]: {
            gridTemplateColumns: ({ stepNames }) =>
                `repeat(${stepNames.length}, 70px)`,
            gridColumnGap: theme.spacing * 8,
        },
        [theme.mediaQueries.xsUp]: {
            gridTemplateColumns: ({ stepNames }) =>
                `repeat(${stepNames.length}, 75px)`,
            gridColumnGap: theme.spacing * 9,
        },
        [theme.mediaQueries.mUp]: {
            gridTemplateColumns: ({ stepNames }) =>
                `repeat(${stepNames.length}, 64px)`,
        },
    },
    item: {
        ...theme.utils.grid.center,
        gridRowGap: theme.spacing,
        justifyItems: 'center',
        borderRadius: '50%',
        '& svg': {
            width: 60,
        },
        '& > p': {
            ...theme.typography.subtitle1,
            fontWeight: 500,
            color: theme.palette.secondary.main,
        },

        [theme.mediaQueries.xxsUp]: {
            '& svg': {
                width: 70,
            },
        },
        [theme.mediaQueries.xsUp]: {
            '& svg': {
                width: 75,
            },
        },
        [theme.mediaQueries.mUp]: {
            '& svg': {
                width: 80,
            },
        },
    },
    iconWrapper: {
        position: 'relative',
    },
    progressBar: {
        position: 'absolute',
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',

        height: 2,
        width: theme.spacing * 6,
        backgroundColor: theme.palette.primary.main,
        placeSelf: 'center',

        [theme.mediaQueries.xxsUp]: {
            width: theme.spacing * 8,
        },
        [theme.mediaQueries.xsUp]: {
            width: theme.spacing * 9,
        },
    },
    progressBarDisabled: {
        extend: 'progressBar',
        backgroundColor: theme.palette.disabled.light,
    },
}))

const Timeline = ({
    stepNames = [],
    height = '100%',
    step = '',
    stepValues = [],
    className,
}) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const stepIndex = stepValues.indexOf(step)

    const clickHandler = (currentIndex) => {
        if (currentIndex < stepIndex) {
            dispatch(setSignupStatus(stepValues[currentIndex]))
        }
    }

    const classes = useStyles({ height, stepNames })
    return (
        <div className={cx(classes.root, className)}>
            {stepNames?.map((item, index) => {
                return (
                    <div className={classes.item} key={index}>
                        <div
                            style={{
                                cursor:
                                    index < stepIndex ? 'pointer' : 'normal',
                            }}
                            className={classes.iconWrapper}
                            onClick={() => clickHandler(index)}
                        >
                            {index === stepIndex ? (
                                <BrandIcon />
                            ) : (
                                <BrandFilledIcon
                                    fill={
                                        index > stepIndex
                                            ? theme.palette.disabled.light
                                            : theme.palette.primary.main
                                    }
                                />
                            )}
                            {index < stepNames.length - 1 && (
                                <div
                                    className={
                                        index < stepIndex
                                            ? classes.progressBar
                                            : classes.progressBarDisabled
                                    }
                                />
                            )}
                        </div>
                        <p>{stepNames[index]}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Timeline

Timeline.propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
