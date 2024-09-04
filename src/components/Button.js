import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: ({
        size,
        variant,
        rounded,
        collapsed,
        icon,
        data,
        disabled,
        width,
        isLight,
        iconPosition,
    }) => ({
        ...theme.utils.flexbox.center,
        border: '2px solid',
        borderRadius: 12,
        position: 'relative',
        backgroundColor: theme.palette[data][isLight ? 'buttonLight' : 'main'],
        borderColor: theme.palette[data][isLight ? 'buttonLight' : 'main'],
        color:
            variant === 'ghost' || variant === 'borderless' || isLight
                ? theme.palette[data].main
                : theme.palette.common.white,
        height:
            size === 'large'
                ? theme.spacing * 7
                : size === 'medium'
                    ? theme.spacing * 6
                    : theme.spacing * 5,
        minWidth:
            collapsed
                ? size === 'large'
                    ? theme.spacing * 7
                    : size === 'medium'
                        ? theme.spacing * 6
                        : theme.spacing * 5
                : width,
        width: 'max-content',

        ...((variant === 'filled') && {
            color: theme.palette.common.white,
            borderRadius: '6px'
        }),

        ...(variant === 'recording' && {
            backgroundColor: '#CCD4DE3D',
            border: 'none',
            '&:hover': {
                backgroundColor: theme.palette[data].buttonHover,
            },
        }),
        ...(variant === 'ghost' && {
            backgroundColor: 'unset',
            '&:hover': {
                backgroundColor: theme.palette[data].buttonHover,
            },
        }),
        ...(variant === 'borderless' && {
            backgroundColor:
                isLight
                    ? theme.palette[data][isLight ? 'buttonLight' : 'main']
                    : 'unset',
            border: 0,
        }),
        ...(rounded && {
            borderRadius: 100,
        }),

        ...(!disabled && {
            ...theme.clickable,
            '&:hover': {
                backgroundColor:
                    variant === 'ghost'
                        ? 'none'
                        : variant === 'borderless'
                            ? theme.palette[data].hover
                            : theme.palette[data].darker,
                borderColor: theme.palette[data].darker,
                color:
                    variant === 'ghost'
                        ? theme.palette[data].darker
                        : variant === 'borderless'
                            ? theme.palette[data].main
                            : theme.palette.common.white,
                '& svg': {
                    fill:
                        !disabled &&
                        (variant === 'ghost' || variant === 'borderless') &&
                        [theme.palette[data].darker, '!important'],
                },
            },
            '&:focus': {
                outline: 0
            }
        }),

        ...(disabled && {
            backgroundColor: theme.palette.disabled.light,
            borderColor:
                variant === 'filled'
                    ? theme.palette.disabled.light
                    : theme.palette.disabled.main,
            color: theme.palette.disabled.main,
            '&:hover': {
                backgroundColor: theme.palette.disabled.light,
                color: theme.palette.disabled.main,
                borderColor:
                    variant === 'filled'
                        ? theme.palette.disabled.light
                        : theme.palette.disabled.main,
            },
        }),

        '& > span': {
            ...theme.utils.grid.center,
            whiteSpace: 'nowrap',
            width: '100%',
            textAlign: 'center',
            gridTemplateColumns:
                icon && !collapsed ?
                    iconPosition === 'left'
                        ? '24px min-content'
                        : 'min-content 24px'
                    : '1fr',
            padding: [0, theme.spacing * 2],
            gridColumnGap: theme.spacing,
            ...(size === 'large' && {
                ...theme.typography.buttonBig,
            }),
            ...(size === 'medium' && {
                ...theme.typography.buttonMedium,
            }),
            ...(size === 'small' && {
                ...theme.typography.buttonSmall,
            }),
            '& svg': {
                ...theme.utils.flexbox.center,
                width: 22,
                fill: disabled
                    ? [theme.palette.disabled, '!important']
                    : variant !== 'ghost' && variant !== 'borderless'
                        ? [theme.palette.common.white, '!important']
                        : [theme.palette[data].main, '!important'],
            },
        },
    }),
}))

const Button = ({
    children,
    className,
    type = 'button',
    size = 'large',
    variant = 'filled',
    rounded = false,
    collapsed = false,
    data = 'primary',
    isLight = false,
    icon,
    iconPosition = 'right',
    width = 220,
    disabled = false,
    onClick,
    ...rest
}) => {
    const classes = useStyles({
        size,
        variant,
        rounded,
        collapsed,
        data,
        isLight,
        icon,
        iconPosition,
        width,
        disabled,
    })

    return (
        <button
            className={cx(classes.root, className)}
            type={type}
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >
            {collapsed ? (
                <span>{icon}</span>
            ) : icon ? (
                iconPosition === 'left' ? (
                    <span>
                        {icon}
                        <span>{children}</span>
                    </span>
                ) : (
                    <span>
                        <span>{children}</span>
                        {icon}
                    </span>
                )
            ) : (
                <span>{children}</span>
            )}
        </button>
    )
}

export default Button

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    variant: PropTypes.oneOf(['filled', 'ghost', 'borderless', 'recording']),
    rounded: PropTypes.bool,
    collapsed: PropTypes.bool,
    data: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    isLight: PropTypes.bool,
    icon: PropTypes.element,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
}
