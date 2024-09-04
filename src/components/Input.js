import { forwardRef } from "react"
import { createUseStyles } from "react-jss"
import * as PropTypes from "prop-types"
import cx from "classnames"
import {AlertIconBanner, DoneIcon} from "../theme/icons"

const useStyles = createUseStyles((theme) => ({
    root: {
        position: "relative",
    },
    inputWrapper: ({
        hasError,
        isSuccess,
        touched,
        rounded,
        iconPosition,
    }) => ({
        position: "relative",
        margin: [theme.spacing / 2, 0],
        width: "100%",
        "& input": {
            paddingLeft:
                iconPosition === "left" ? theme.spacing * 6 : theme.spacing * 2,
            paddingRight: touched ? theme.spacing * 10 : theme.spacing * 6,
            ...(rounded && { borderRadius: 100 }),
            ...(hasError && { ...theme.controls.inputError }),
            ...(isSuccess && { ...theme.controls.inputSuccess }),
        },
    }),
    icons: ({ iconPosition }) => ({
        position: "absolute",
        top: "50%",
        ...(iconPosition === "left"
            ? { left: theme.spacing * 2 }
            : { right: theme.spacing * 2 }),
        transform: "translateY(-50%)",
        display: "flex",
        gap: theme.spacing / 2,
        zIndex: 1,
    }),
    icon: {
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        cursor: "pointer",
        "& svg": {
            width: 24,
            height: 24,
        },
    },
    statusIcons: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        gap: theme.spacing / 2,
        zIndex: 1,
        left: "unset",
        right: theme.spacing * 2,
    },
    statusIconWarning: {
        extend: "icon",
        cursor: "unset",
    },
    statusIconSuccess: {
        extend: "icon",
        cursor: "unset",
        fill: theme.palette.success.main,
    },
    errorMessage: {
        color: theme.palette.error.main,
    }
}))

//<Input label="First Name" {...register("firstName")} />
const Input = forwardRef(function Input(
    {
        label,
        name,
        type = "text",
        placeholder,
        helpText,
        onChange,
        onBlur,
        icon,
        iconPosition = "left",
        rounded,
        iconCallback,
        statusIcon,
        statusIconCallback,
        touched = false,
        errors,
        rootClassName,
        inputProps,
        disabled,
        ...rest
    },
    ref
) {
    const classes = useStyles({
        touched,
        iconPosition,
        rounded,
        isSuccess: !errors && touched,
        hasError: !!errors,
        iconDx: icon,
    })

    return (
        <div
            className={cx(
                classes.root,
                rootClassName)}
            {...rest}
        >
            {!!label && (
                <label htmlFor={name}>
                    {label}
                </label>
            )}
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
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    ref={ref}
                    {...inputProps}
                />
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

export default Input

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(["text", "password", "number", "email", "url"]),
    placeholder: PropTypes.string,
    helpText: PropTypes.node,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    icon: PropTypes.element,
    iconPosition: PropTypes.oneOf(["left", "right"]),
    rounded: PropTypes.bool,
    iconCallback: PropTypes.func,
    statusIcon: PropTypes.element,
    statusIconCallback: PropTypes.func,
    touched: PropTypes.bool,
    errors: PropTypes.object,
    rootClassName: PropTypes.string,
    inputProps: PropTypes.object,
    disabled: PropTypes.bool
}
