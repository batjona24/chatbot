import React, { forwardRef } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
    root: {
        width: 'max-content',
        maxWidth: '100%'
    },
    radioWrapper: ({disabled}) => ({
        ...theme.utils.flexbox.start,
        gap: `${theme.spacing}px`,
        cursor: disabled ? 'not-allowed' : 'pointer'
    }),
    label: ({labelPosition}) => ({
        ...(labelPosition === 'right' && {order: 2}),
    }),
    radio: ({
        labelPosition,
        isSmall,
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
        borderRadius: '50%',
        appearance: 'none',
        padding: 2,
        ...(!disabled && {...theme.clickable}),
        '&:checked': {
            backgroundColor: theme.palette.common.white,
            borderColor: theme.palette.tertiary.main,
            content: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' rx='5' fill='%236426E1'/%3E%3C/svg%3E")`,
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

const Radio = forwardRef(function Radio(
    {
        className,
        radioWrapperClassName,
        radioClassName,
        name,
        label,
        labelPosition = 'left',
        error,
        isSmall,
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
        isSmall
    })

    return (
        <div className={cx(classes.root, className)} {...rest}>
            <label
                id={name}
                className={cx(classes.radioWrapper, radioWrapperClassName)}
            >
                {!!label && <span className={classes.label}>{label}</span>}
                <input
                    type={'radio'}
                    className={cx(classes.radio, radioClassName)}
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

export default Radio

Radio.propTypes = {
    className: PropTypes.string,
    radioWrapperClassName: PropTypes.string,
    radioClassName: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    labelPosition: PropTypes.oneOf(['left', 'right']),
    error: PropTypes.object,
    isSmall: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    inputProps: PropTypes.object
}
