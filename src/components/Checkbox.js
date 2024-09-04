import React, { forwardRef } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
    root: {
        width: 'max-content',
        maxWidth: '100%'
    },
    checkboxWrapper: ({disabled}) => ({
        ...theme.utils.flexbox.start,
        gap: `${theme.spacing}px`,
        cursor: disabled ? 'not-allowed' : 'pointer'
    }),
    label: ({labelPosition}) => ({
        ...(labelPosition === 'right' && {order: 2}),
    }),
    checkbox: ({
        labelPosition,
        isSmall,
        isSelectAll,
        disabled
    }) => ({
        ...(labelPosition === 'right' && {order: 1}),
        width:
            isSmall
                ? theme.spacing * 2
                : theme.spacing * 2.5,
        height:
            isSmall
                ? theme.spacing * 2
                : theme.spacing * 2.5,
        border: `1px solid ${theme.palette.common.grey}`,
        borderRadius: 4,
        appearance: 'none',
        padding: 0,
        ...(!disabled && {...theme.clickable}),
        '&:checked': {
            borderColor: theme.palette.tertiary.main,
            background: theme.palette.tertiary.main,
            content:
                isSelectAll
                    ? `url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='minimize_black_24dp'%3E%3Cpolygon id='Path' points='0 0 24 0 24 24 0 24'%3E%3C/polygon%3E%3Cpolygon id='Path' fill='%23FFFFFF' fill-rule='nonzero' points='6 11 18 11 18 13 6 13'%3E%3C/polygon%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    : `url("data:image/svg+xml,%3Csvg viewBox='-4 -4 18 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4L4 7L9 1' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")`,
            fill: theme.palette.common.white,
        },
        '&:disabled': {
            cursor: 'not-allowed',
            background: theme.palette.disabled.light,
        }
    }),
    errorMessage: {
        color: theme.palette.error.main,
    },
}))

const Checkbox = forwardRef(function Checkbox(
    {
        className,
        checkboxWrapperClassName,
        checkboxClassName,
        name,
        label,
        labelPosition = 'left',
        error,
        isSmall,
        isSelectAll = false,
        disabled,
        onChange,
        onBlur,
        inputProps,
        ...rest
    },
    ref
 ) {
    const classes = useStyles({
        labelPosition,
        disabled,
        isSmall,
        isSelectAll
    })

    return (
        <div className={cx(classes.root, className)} {...rest}>
            <label
                id={name}
                className={cx(classes.checkboxWrapper, checkboxWrapperClassName)}
            >
                {!!label && <span className={classes.label}>{label}</span>}
                <input
                    type={'checkbox'}
                    className={cx(classes.checkbox, checkboxClassName)}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    ref={ref}
                    {...inputProps}
                />
            </label>
            {error?.message && (
                <div>
                    <small className={classes.errorMessage}>
                        {error.message}
                    </small>
                </div>
            )}
        </div>
    )
})

export default Checkbox

Checkbox.propTypes = {
    className: PropTypes.string,
    checkboxWrapperClassName: PropTypes.string,
    checkboxClassName: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    labelPosition: PropTypes.oneOf(['left', 'right']),
    error: PropTypes.object,
    isSmall: PropTypes.bool,
    isSelectAll: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    inputProps: PropTypes.object
}
