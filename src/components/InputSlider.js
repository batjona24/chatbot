import Slider from "react-input-slider"
import PropTypes from "prop-types"
import {createUseStyles, useTheme} from "react-jss"
import cx from 'classnames'
import {useController} from "react-hook-form"

const useStyles = createUseStyles((theme) => ({
    root: {
        position: 'relative',
    },
    tooltip: ({
        value,
        minValue,
        maxValue,
        isSmall,
        marksNumber,
        disabled
    }) => ({
        position: 'absolute',
        bottom:
            marksNumber
                ? isSmall
                    ? theme.spacing * 6.5
                    : theme.spacing * 7.5
                : isSmall
                    ? theme.spacing * 3.5
                    : theme.spacing * 4.5,
        left: `${(((value - minValue) / (maxValue - minValue)) * 100)}%`,
        transform: 'translateX(-50%)',
        minWidth: theme.spacing * 6,
        ...theme.card,
        padding: theme.spacing / 2,
        borderRadius: theme.spacing / 2,
        color:
            disabled
                ? theme.palette.grey[500]
                : theme.palette.grey[800],
        fontSize: 12,
        fontWeight: 500,
        textAlign: "center"
    }),
    marks: ({marksNumber, disabled}) => ({
        width: `calc(100% + ${100 / (marksNumber - 1)}%)`,
        ...theme.utils.flexbox.spaceBetween,
        '& > div': {
            width: `100%`,
            fontSize: theme.spacing * 2,
            color:
                disabled
                    ? theme.palette.grey[500]
                    : theme.palette.grey[800],
            textAlign: 'center',
            transform: 'translateX(-50%)'
        }
    }),
    errorMessage: {
        color: theme.palette.error.main,
    },
}))

const InputSlider = ({
    className,
    tooltipClassName,
    trackStyle,
    activeStyle,
    thumbStyle,
    disabledStyle,
    name,
    control,
    isSmall = false,
    minValue = 0,
    maxValue = 100,
    step = 1,
    defaultValue = (minValue + maxValue) / 2,
    marksNumber = ((maxValue - minValue) / step) + 1,
    prefix = '',
    suffix = '',
    label,
    helpText,
    color = 'primary',
    disabled = false,
    onChangeCb,
    ...rest
}) => {
    const {
            field: {onChange, value, ...fieldProps},
            fieldState: {error, isTouched, ...fieldStateProps},
            formState
        } = useController({
            name,
            control,
            defaultValue,
        })

    const theme = useTheme()
    const classes = useStyles({
        value,
        minValue,
        maxValue,
        isSmall,
        disabled,
        marksNumber
    })

    const onChangeHandler = (value) => {
        !!onChangeCb
            ? onChangeCb(value)
            : onChange(value)
    }

    const sliderStyle = {
        track: {
            width: '100%',
            height: isSmall ? theme.spacing : theme.spacing * 2,
            borderRadius: theme.spacing,
            backgroundColor:
                disabled
                    ? theme.palette.disabled.light
                    : theme.palette.grey[300],
            ...theme.clickable,
            ...trackStyle
        },
        active: {
            backgroundColor:
                disabled
                    ? theme.palette.disabled.main
                    : theme.palette[color].main,
                    borderRadius: theme.spacing,
            ...activeStyle
        },
        thumb: {
            width: isSmall ? theme.spacing * 2 : theme.spacing * 3,
            height: isSmall ? theme.spacing * 2 : theme.spacing * 3,
            backgroundColor: theme.palette.common.white,
            borderRadius: theme.spacing * 2,
            boxShadow: '0 0 4px 2px rgba(0,0,0, 0.4)',
            cursor:
                disabled
                    ? 'not-allowed'
                    : 'pointer',
            ...thumbStyle
        },
        disabled: {
            opacity: 1,
            cursor: 'not-allowed',
            ...disabledStyle
        },
    }

    return (
        <div
            className={cx(classes.root, className)}
            {...rest}
        >
            {!!label && <label>{label}</label>}
            <div className={cx(classes.tooltip, tooltipClassName)}>
                {prefix}
                {value}
                {suffix}
            </div>
            <Slider
                name={name}
                axis={'x'}
                xmin={minValue}
                xmax={maxValue}
                xstep={step}
                disabled={disabled}
                x={value}
                onChange={({x: value}) => onChangeHandler(value)}
                styles={sliderStyle}
                {...fieldProps}
                {...formState}
            />
            <div className={classes.marks}>
                {
                    Array.from(Array(marksNumber).keys()).map((mark, index) => (
                        <div key={index}>
                            {prefix}
                            {
                                (((maxValue - minValue) / (marksNumber - 1)) * index) + minValue
                            }
                            {suffix}
                        </div>
                    ))
                }
            </div>
            {error?.message && (
                <div>
                    <small className={classes.errorMessage}>
                        {error.message}
                    </small>
                </div>
            )}
            {helpText && (
                <div>
                    <small>{helpText}</small>
                </div>
            )}
        </div>
    )
}

export default InputSlider

InputSlider.propTypes = {
    className: PropTypes.string,
    tooltipClassName: PropTypes.string,
    trackStyle: PropTypes.object,
    activeStyle: PropTypes.object,
    thumbStyle: PropTypes.object,
    disabledStyle: PropTypes.object,
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    isSmall: PropTypes.bool,
    defaultValue: PropTypes.number,
    marksNumber: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    step: PropTypes.number,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    label: PropTypes.string,
    helpText: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    disabled: PropTypes.bool,
    onChangeCb: PropTypes.func,
}