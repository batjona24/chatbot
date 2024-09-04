import { forwardRef, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import { AlertIcon, AlertSuccessIcon } from '../theme/icons'

const useStyles = createUseStyles((theme) => ({
    root: {
        position: 'relative',
    },
    textAreaWrapper: ({ hasError, icon, isSuccess }) => ({
        position: 'relative',
        flexGrow: 1,
        '& textarea': {
            padding: icon ? [6, 24, 6, 8] : [6, 8],
            resize: 'none',
            overflow: 'auto',
            maxHeight: theme.spacing * 20,
            minHeight: 36,
            fontSize: 14,
            color: theme.palette.grey[600],
            height: 'auto',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
            '-ms-overflow-style': 'none' /* IE and Edge */,
            scrollbarWidth: 'none' /* Firefox */,
            '&:focus': {
                outline: 'none',
            },
            ...(hasError && { ...theme.controls.textareaError }),
            ...(isSuccess && { ...theme.controls.inputSuccess }),
        },
    }),
    errorMessage: {
        color: theme.palette.error.main,
    },
    charsLeft: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        fontSize: 10,
        color: theme.palette.grey[600],
    },
    icon: {
        position: 'absolute',
        right: 8,
        padding: [0, theme.spacing],
        bottom: 7,
    },
    statusIconWarning: {
        extend: 'icon',
        cursor: 'unset',
    },
    statusIconSuccess: {
        extend: 'icon',
        cursor: 'unset',
    },
}))

/**
 * Expand the height of the input box as multiple lines of text are entered.
 */
const autoExpand = (el) => {
    setTimeout(() => {
        el.style.cssText = 'height:auto; padding:0'
        el.style.cssText = 'height:' + el.scrollHeight + 'px'
    }, 0)
}

const TextArea = forwardRef(function TextArea(
    {
        label,
        name,
        placeholder,
        helpText,
        onChange,
        onBlur,
        icon,
        iconCallback,
        touched = false,
        errors,
        inputProps,
        keyPressCallback,
        className,
        rootClassName,
        rows = 1,
        ...rest
    },
    forwardedRef
) {
    const textAreaRef = useRef()
    /* Textarea must have at least one ref to autoExpand*/
    const ref = forwardedRef ?? textAreaRef

    const handleKeyPress = (e) => {
        if (typeof keyPressCallback === 'function') keyPressCallback(e)
        autoExpand(e.target)
    }

    const classes = useStyles({
        touched,
        icon,
        isSuccess: !errors && touched,
    })

    return (
        <div className={cx(classes.root, rootClassName)} {...rest}>
            {!!label && <label htmlFor={name}>{label}</label>}
            <div className={cx(classes.textAreaWrapper, className)}>
                <textarea
                    ref={ref}
                    name={name}
                    rows={rows}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    {...inputProps}
                />
                {rest.maxLength && (
                    <div className={classes.charsLeft}>
                        {0}/{rest.maxLength}
                    </div>
                )}
                {!errors && touched && (
                    <div className={classes.icon}>
                        <AlertSuccessIcon width={24} />
                    </div>
                )}
                {icon && <div className={classes.icon}>{icon}</div>}
            </div>
            {errors?.message && (
                <div>
                    <small className={classes.errorMessage}>
                        {errors.message}
                    </small>
                </div>
            )}
        </div>
    )
})
export default TextArea
