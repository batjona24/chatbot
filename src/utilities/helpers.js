import { setAlertMessage } from '../store/slices/app'
import store from '../store'
import {app} from './constants'
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

const transformCheckboxNumberValue = (e) => {
    const output = parseInt(e.target.value, 10)
    return isNaN(output) ? 0 : output
}

export const dispatchErrorMessage = (message) => {
    store.dispatch(
        setAlertMessage({ message, visible: true, variant: app.FAILURE })
    )
}

export const handleApiError = ({
    isReduxError = true,
    error: originalError,
    callbackOnFieldError,
    callbackOnGeneralError = dispatchErrorMessage,
    callbackOnFocusError,
    prependNameSpace,
}) => {
    const error = isReduxError
        ? { response: { data: { ...originalError } } }
        : originalError

    if (error?.response?.data) {
        console.log(error)
        Object.keys(error.response.data).forEach((errorFieldName, i) => {
            if (i === 0) {
                saferun(callbackOnFocusError, errorFieldName)
            }
            if (errorFieldName === 'message') {
                const errorValue = error.response.data[errorFieldName]
                // Generic error
                callbackOnGeneralError(errorValue)
            } else {
                // Form field error
                const errorValue = prependNameSpace
                    ? `${prependNameSpace}:${error.response.data[errorFieldName]}`
                    : error.response.data[errorFieldName]

                callbackOnFieldError(errorFieldName, {
                    message: Array.isArray(errorValue)
                        ? errorValue.join(' ')
                        : errorValue,
                    type: 'backend',
                })
            }
        })
    }
}

export const capitalize = ([firstLetter, ...rest]) =>
    firstLetter.toUpperCase() + rest.join('')

export const remapApiOptions = (options) =>
    options?.map(({ id, name, ...rest }) => ({
        value: id,
        label: name,
        //data: rest,
    }))

export const retrieveSelectSingleValue = (options, value) => {
    if (
        value === null ||
        value === '' ||
        value === undefined ||
        options === null
    )
        return null
    return options.find((option) => option.value.toString() === value.toString()
    )
}

export const retrieveSelectMultiValues = (options, values) => {
    if (values === null || values === '' || values === undefined || values.length === 0 || options === null) {
        return []
    } else {
        return options.filter(option => (
            values.find(value => (
                value.toString() === option.value.toString()
            ))
        ))
    }
}

export const getInitials = (name) => {
    return name.match(/\b\w/g) || []
}
export const getHumanReadableDate = (date, format) => {
    if (format) return dayjs(date).format(format)
    const secondsDiff = dayjs().diff(dayjs(date), 's')
    switch (true) {
        case secondsDiff > 29030400:
            return dayjs(date).format('MM/DD/YYYY')
        case secondsDiff > 2419200:
            const months = dayjs().diff(dayjs(date), 'M')
            return `${months} ${months > 1 ? `months` : `month`} ago`
        case secondsDiff > 604800:
            const weeks = dayjs().diff(dayjs(date), 'w')
            return `${weeks} ${weeks > 1 ? `weeks` : `week`} ago`
        case secondsDiff > 86400:
            return `${dayjs().diff(dayjs(date), 'd')}d`
        case secondsDiff > 3600:
            return `${dayjs().diff(dayjs(date), 'h')}h`
        case secondsDiff > 60:
            return `${dayjs().diff(dayjs(date), 'm')}m`
        default:
            return `${secondsDiff}s`
    }
}

export const iterateOverTouchedFields = (touchedFields, formValues) => {
    let dataToSend = {}
    for (const key in touchedFields) {
        dataToSend = {
            ...dataToSend,
            [key]: formValues?.[key],
        }
    }
    return dataToSend
}

export const getExtension = (url) => {
    return url.split('.').pop()
}

export const saferun = (callback, params) => {
    if (typeof callback === 'function') {
        params ? callback(params) : callback()
    }
}

export const copyTextToClipboard = async (text) => {
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text)
    } else {
        return document.execCommand('copy', true, text)
    }
}

/*date time helpers*/
export const formatDate = (date, formatType = 'YYYY-MM-DD') => date ? dayjs(date).format(formatType) : '-'

export const isPasteDate = (date) => dayjs(date)?.valueOf() < dayjs(new Date()).valueOf()

export const getTimezone = () => {
    dayjs.extend(utc)
    dayjs.extend(timezone)

    return dayjs.tz.guess()
}