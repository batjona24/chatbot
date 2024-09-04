import {createUseStyles} from "react-jss"
import PropTypes from "prop-types"
import cx from 'classnames'

const useStyles = createUseStyles(theme => ({
    chip: ({
        color,
        textColor,
        outlined,
        textOnly,
        size,
        rounded,
        isStrokeIcon,
        isPathFilledIcon,
        iconPosition,
        textUppercase,
        isClickable,
        fullWidth,
        disabled
    }) => ({
        ...theme.utils.flexbox.center,
        gap: theme.spacing,
        flexFlow:
            iconPosition === 'left'
                ? 'row'
                : 'row-reverse',
        height:
            size === 'small'
                ? theme.spacing * 2
                : size === 'big'
                    ? theme.spacing * 4
                    : theme.spacing * 3,
        width:
            fullWidth
                ? '100%'
                : 'max-content',
        maxWidth: '100%',
        padding: [0, theme.spacing * 2],
        borderRadius:
            rounded
                ? theme.spacing * 4
                : 4,
        background:
            (outlined || textOnly)
                ? 'transparent'
                : theme.palette.chip[color] || color,
        border:
            textOnly
                ? 'none'
                : outlined
                    ? `1px solid ${theme.palette.chip[textColor] || textColor}`
                    : `1px solid ${theme.palette.chip[color] || color}`,
        ...(disabled && {
            opacity: 0.5,
            cursor: ['not-allowed', '!important']
        }),
        ...((isClickable && !disabled) && theme.clickable),
        '& svg': {
            height:
                size === 'small'
                    ? theme.spacing * 1.5
                    : size === 'big'
                        ? theme.spacing * 2
                        : theme.spacing * 1.5,
            ...(!isStrokeIcon && {fill: theme.palette.chip[textColor] || textColor}),
            '& path': {
                ...(isStrokeIcon && {stroke: theme.palette.chip[textColor] || textColor}),
                ...(isPathFilledIcon && {fill: theme.palette.chip[textColor] || textColor}),
            }
        },
        '& span': {
            fontSize:
                size === 'big'
                    ? 12
                    : 10,
            fontWeight: 700,
            textTransform:
                textUppercase
                    ? 'uppercase'
                    : 'inherit',
            color: theme.palette.chip[textColor] || textColor,
            ...theme.utils.truncateText
        }
    })
}))

const Chip = ({
    className,
    color = 'primary',
    textColor = 'white',
    outlined,
    textOnly,
    size = 'medium',
    rounded,
    text,
    textUppercase,
    icon,
    isStrokeIcon,
    isPathFilledIcon,
    iconPosition = 'left',
    isClickable,
    fullWidth,
    disabled,
    ...rest
}) => {
    const classes = useStyles({
        color,
        textColor,
        outlined,
        textOnly,
        size,
        rounded,
        textUppercase,
        isStrokeIcon,
        isPathFilledIcon,
        iconPosition,
        isClickable,
        fullWidth,
        disabled
    })

    return (
        <div
            className={cx(classes.chip, className)}
            title={text}
            {...rest}
        >
            {!!icon &&
                <div>
                    {icon}
                </div>
            }
            {!!text &&
                <span>
                    {text}
                </span>
            }
        </div>
    )
}

export default Chip

Chip.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    textColor: PropTypes.string,
    outlined: PropTypes.bool,
    textOnly: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'big']),
    rounded: PropTypes.bool,
    text: PropTypes.string,
    icon: PropTypes.element,
    isStrokeIcon: PropTypes.bool,
    isPathFilledIcon: PropTypes.bool,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    textUppercase: PropTypes.bool,
    isClickable: PropTypes.bool,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool
}