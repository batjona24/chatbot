import {forwardRef, useMemo} from 'react'
import { createUseStyles } from 'react-jss'
import * as PropTypes from 'prop-types'
import cx from 'classnames'
import {AlertIconBanner, DoneIcon} from '../theme/icons'
import {isMobile, isTablet} from "react-device-detect"
import {useController} from "react-hook-form"
import DatePicker from 'react-datepicker'
import * as locales from "date-fns/locale";
import 'react-datepicker/dist/react-datepicker.min.css'

const useStyles = createUseStyles((theme) => ({
    root: {
        position: 'relative',
        '& .react-datepicker-popper': { //calendar root
            zIndex: 2,
            boxShadow: theme.shadows[80]
        },
        '& .react-datepicker': { //calendar
            fontFamily: "inherit",
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
            border: `1px solid ${theme.palette.tertiary.main}`,
            borderRadius: 0,
            borderBottomRightRadius: 0,
            display: "flex"
        },
        '& .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before': { //triangle border
            borderBottomColor: theme.palette.tertiary.main
        },
        '& .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after': { //triangle content
            borderBottomColor: theme.palette.tertiary.main
        },
        '& .react-datepicker__navigation': { //navigation button
            '&:focus': {
                outline: 0
            }
        },
        '& .react-datepicker__navigation-icon': { //navigation icons
            fontSize: "inherit"
        },
        '& .react-datepicker__navigation-icon:before': { //navigation arrows
            borderColor: theme.palette.common.white,
            ...theme.clickable
        },
        '& .react-datepicker__header': { //month and time header
            borderTopLeftRadius: 0,
            borderTopRightRadius: [0, "!important"],
            borderBottom: "none",
            padding: [theme.spacing, 0],
            backgroundColor: theme.palette.tertiary.main
        },
        '& .react-datepicker__header--has-time-select': { //month header id there's time selector
            borderTopRightRadius: 0
        },
        '& .react-datepicker__current-month': { //month name
            color: theme.palette.common.white
        },
        '& .react-datepicker__day-name': { //day name
            color: theme.palette.common.white
        },
        '& .react-datepicker__day': { //day
            color: theme.palette.common.black,
            borderRadius: 0,
            ...theme.clickable,
            '&:hover': {
                backgroundColor: theme.palette.tertiary.light
            }
        },
        '& .react-datepicker__day--keyboard-selected, .react-datepicker__day--in-selecting-range': { //keyboard selection day and range selecting days
            color: theme.palette.common.black,
            background: theme.palette.tertiary.light
        },
        '& .react-datepicker__day--weekend': { //weekend day
            color: theme.palette.primary.main
        },
        '& .react-datepicker__day--today': { //today
            fontWeight: 700,
            color: theme.palette.tertiary.main,
            backgroundColor: theme.palette.tertiary.light
        },
        '& .react-datepicker__day--selected, .react-datepicker__day--in-range': { //selected day and range selected days
            fontWeight: 700,
            color: theme.palette.common.white,
            backgroundColor: theme.palette.tertiary.main,
            '&:hover': {
                backgroundColor: [theme.palette.tertiary.dark, "!important"]
            }
        },
        '& .react-datepicker__day--outside-month': { //not selected month day
            opacity: 0.5
        },
        '& .react-datepicker__day--disabled': { //disabled day
            opacity: 0.2
        },
        '& .react-datepicker__time-container': { //time container
            borderLeft: "none"
        },
        '& .react-datepicker__header--time': { //time header
            borderTopRightRadius: [0, "!important"]
        },
        '& .react-datepicker-time__header': { //time header content
            color: theme.palette.common.white
        },
        '& .react-datepicker__header--time react-datepicker__header--time--only': {
            borderTopLeftRadius: [0, "!important"]
        },
        '& .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box': { //hours container
            borderBottomRightRadius: 0
        },
        '& .react-datepicker__time-list': { //time list
            borderRadius: 0,
            '&::-webkit-scrollbar': { //scrollbar container
                width: theme.spacing,
                background: theme.palette.tertiary.light,
            },
            '&::-webkit-scrollbar-thumb': { //scrollbar handle
                backgroundColor: theme.palette.tertiary.main,
                '&:hover': {
                    backgroundColor: theme.palette.tertiary.dark
                }
            }
        },
        '& .react-datepicker__time-list-item': { //hour
            color: theme.palette.common.black,
            ...theme.clickable,
        },
        '& .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item:hover': { //hover hour
            backgroundColor: theme.palette.tertiary.light
        },
        '& .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected': { //selected hour
            fontWeight: 700,
            color: theme.palette.common.white,
            backgroundColor: theme.palette.tertiary.main,
            '&:hover': {
                backgroundColor: theme.palette.tertiary.dark
            }
        },
        '& .react-datepicker__close-icon::after': { //reset icon
            ...theme.clickable,
            backgroundColor: theme.palette.tertiary.main,
            color: theme.palette.common.white,
            borderRadius: theme.spacing / 2
        }
    },
    inputWrapper: ({
                       hasError,
                       isSuccess,
                       touched,
                       rounded,
                       iconPosition,
                   }) => ({
        position: 'relative',
        margin: [theme.spacing / 2, 0],
        width: '100%',
        '& input': {
            paddingLeft:
                iconPosition === 'left' ? theme.spacing * 6 : theme.spacing * 2,
            paddingRight: touched ? theme.spacing * 10 : theme.spacing * 6,
            ...(rounded && { borderRadius: 100 }),
            ...(hasError && { ...theme.controls.inputError }),
            ...(isSuccess && { ...theme.controls.inputSuccess }),
        },
    }),
    icons: ({ iconPosition }) => ({
        position: 'absolute',
        top: '50%',
        ...(iconPosition === 'left'
            ? { left: theme.spacing * 2 }
            : { right: theme.spacing * 2 }),
        transform: 'translateY(-50%)',
        display: 'flex',
        gap: theme.spacing / 2,
        zIndex: 1,
    }),
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        cursor: 'pointer',
        '& svg': {
            width: 24,
            height: 24,
        },
    },
    statusIcons: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        gap: theme.spacing / 2,
        zIndex: 1,
        left: 'unset',
        right: theme.spacing * 2,
    },
    statusIconWarning: {
        extend: 'icon',
        cursor: 'unset',
    },
    statusIconSuccess: {
        extend: 'icon',
        cursor: 'unset',
        fill: theme.palette.success.main,
    },
    errorMessage: {
        color: theme.palette.error.main,
    }
}))

const InputDateTime = forwardRef(function InputDateTime(
    {
        control,
        defaultValue,
        label,
        name,
        placeholder,
        helpText,
        onChangeCb,
        icon,
        iconPosition = 'left',
        rounded,
        iconCallback,
        statusIcon,
        statusIconCallback,
        touched = false,
        errors,
        rootClassName,
        inputProps,
        disabled = false,
        isClearable= true,
        closeOnScroll= false,
        calendarPlacement = "bottom",
        dateFormat= "yyyy-MM-dd hh:mm a",
        showTimeSelect= true,
        showTimeSelectOnly= false,
        showNativeInput = isMobile || isTablet,
        isRange = false,
        includeDates,
        includeDateIntervals,
        includeTimes,
        excludeDates,
        excludeDateIntervals,
        excludeTimes,
        filterTime,
        minDate,
        maxDate,
        closeOnSelect = true,
        openToDate,
        locale = "en-US",
        ...rest
    },
    ref
) {
    const parsedLocale = useMemo(() => {
        let foundLocale = null

        for(const [key, value] of Object.entries(locales)) {
            if(!!foundLocale) {
                break
            }
            else {
                if(value.code === locale) {
                    foundLocale = locales[key]
                }
            }
        }

        return foundLocale || locales.enUS
    }, [locale])

    const classes = useStyles({
        touched,
        iconPosition,
        rounded,
        isSuccess: !errors && touched,
        hasError: !!errors,
        iconDx: icon,
    })

    const {
        field: {onChange, value, ...fieldProps},
        fieldState: {error, isTouched, ...fieldStateProps},
        formState,
    } = useController({
        name,
        control,
        defaultValue,
    })

    const onChangeHandler = (value) => {
        !!onChangeCb
            ? onChangeCb(value)
            : onChange(value)
    }

    return (
        <div className={cx(classes.root, rootClassName)} {...rest}>
            {!!label && <label htmlFor={name}>{label}</label>}
            <div className={classes.inputWrapper}>
                <span className={classes.icons}>
                    {icon && (
                        <span
                            className={classes.icon}
                            {...(iconCallback && { onClick: iconCallback })}
                        >
                            {icon}
                        </span>
                    )}
                </span>
                {showNativeInput
                    ? (
                        <input
                            name={name}
                            type={
                                showTimeSelectOnly
                                    ? 'time'
                                    : showTimeSelect
                                        ? 'datetime-local'
                                        : 'date'
                            }
                            placeholder={placeholder}
                            onChange={(e) => onChangeHandler(e.target.value)}
                            disabled={disabled}
                            ref={ref}
                            {...fieldProps}
                            {...formState}
                            {...inputProps}
                        />
                    )
                    : (
                        <DatePicker
                            onChange={onChangeHandler}
                            selected={isRange ? value?.[0] : value}
                            isClearable={isClearable}
                            placeholderText={placeholder}
                            closeOnScroll={closeOnScroll}
                            popperPlacement={calendarPlacement}
                            dateFormat={dateFormat}
                            showTimeSelect={showTimeSelect && !isRange}
                            showTimeSelectOnly={showTimeSelectOnly}
                            startDate={value?.[0]}
                            endDate={value?.[1]}
                            selectsRange={isRange}
                            includeDates={includeDates}
                            includeDateIntervals={includeDateIntervals}
                            includeTimes={includeTimes}
                            excludeDates={excludeDates}
                            excludeDateIntervals={excludeDateIntervals}
                            excludeTimes={excludeTimes}
                            filterTime={filterTime}
                            minDate={minDate}
                            maxDate={maxDate}
                            disabled={disabled}
                            shouldCloseOnSelect={closeOnSelect}
                            openToDate={openToDate}
                            locale={parsedLocale}
                            ref={ref}
                            {...fieldProps}
                            {...formState}
                            {...inputProps}
                        />
                    )
                }
                <span className={classes.statusIcons}>
                    {!!errors ? (
                        <span className={classes.statusIconWarning}>
                            <AlertIconBanner />
                        </span>
                    ) : (
                        touched && (
                            <span className={classes.statusIconSuccess}>
                                <DoneIcon data-color/>
                            </span>
                        )
                    )}
                    {statusIcon && (
                        <span
                            className={classes.icon}
                            {...(statusIconCallback && {
                                onClick: statusIconCallback,
                            })}
                        >
                            {statusIcon}
                        </span>
                    )}
                </span>
            </div>
            {errors?.message && (
                <div>
                    <small className={classes.errorMessage}>
                        {errors.message}
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
})

export default InputDateTime

InputDateTime.propTypes = {
    control: PropTypes.any.isRequired,
    defaultValue: PropTypes.any, //required if isRange
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    helpText: PropTypes.string,
    onChangeCb: PropTypes.func,
    icon: PropTypes.element,
    iconPosition: PropTypes.oneOf(['left', 'white']),
    rounded: PropTypes.bool,
    iconCallback: PropTypes.func,
    statusIcon: PropTypes.element,
    statusIconCallback: PropTypes.func,
    touched: PropTypes.bool,
    errors: PropTypes.object,
    rootClassName: PropTypes.string,
    inputProps: PropTypes.object,
    disabled: PropTypes.bool,
    isClearable: PropTypes.bool,
    closeOnScroll: PropTypes.bool,
    calendarPlacement: PropTypes.oneOf(['bottom', 'top']),
    dateFormat: PropTypes.string,
    showTimeSelect: PropTypes.bool,
    showTimeSelectOnly: PropTypes.bool,
    showNativeInput: PropTypes.bool,
    isRange: PropTypes.bool,
    includeDates: PropTypes.array,
    includeDateIntervals: PropTypes.array,
    includeTimes: PropTypes.array,
    excludeDates: PropTypes.array,
    excludeDateIntervals: PropTypes.array,
    excludeTimes: PropTypes.array,
    filterTimes: PropTypes.bool,
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    closeOnSelect: PropTypes.bool,
    openToDate: PropTypes.string,
    locale: PropTypes.string
}
