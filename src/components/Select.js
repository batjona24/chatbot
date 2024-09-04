import React, {useCallback} from 'react'
import {createUseStyles, useTheme} from 'react-jss'
import {useController} from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import ReactSelect, {components} from 'react-select'
import {CloseIcon} from '../theme/icons'
import cx from 'classnames'
import {reactSelectsStyleGenerator} from "../utilities/reactSelectStyleGenerator";
import PropTypes from "prop-types"

const useStyles = createUseStyles((theme) => ({
    root: {
        position: 'relative',
    },
    errorMessage: {
        color: theme.palette.error.main,
    },
}))

const Select = ({
    className,
    control,
    name,
    options = [],
    label,
    placeholder,
    helpText,
    defaultValue,
    isSearchable = false,
    isClearable = false,
    isCreatable = false,
    addOptionMessage,
    maxItems = 100,
    isMulti,
    onChangeCallback,
    closeMenuOnSelect = !isMulti,
    customComponents,
    disabled,
    ...rest
}) => {
    const {
            field: {onChange, ...fieldProps},
            fieldState: {error, isTouched, ...fieldStateProps},
            formState,
        } = useController({
            name,
            control,
            defaultValue,
        })

    // This extends the default onChange
    const onChangeHandler = (value) => {
        if (typeof onChangeCallback === 'function') onChangeCallback(value)
        if (!isMulti || (isMulti && value.length <= maxItems)) onChange(value) // Limit multi select
    }

    // Label for new item creation
    const createLabel = useCallback(
        (value) => (
            <span style={{fontSize: 14}}>
                {addOptionMessage}
                <span>{value}</span>
            </span>
        ),
        [addOptionMessage]
    )

    const classes = useStyles()
    const theme = useTheme()

    const reactSelectsStyle = reactSelectsStyleGenerator(
        theme,
        isMulti,
        isCreatable,
        error,
        isTouched,
        disabled,
        rest.singleValueCustomStyle,
        rest.optionCustomStyle,
        rest.menuCustomStyle,
        rest.multiValueLabelCustomStyle,
        rest.multiValueCustomStyle,
    )

    const selectProps = {
        options,
        closeMenuOnSelect,
        isSearchable,
        isClearable,
        isMulti,
        isDisabled: rest.readOnly || disabled,
        classNamePrefix: isCreatable ? 'creatable_select' : 'select',
        styles: reactSelectsStyle,
        placeholder,
        ...rest,
    }

    const components = {
        MultiValueRemove,
        ...customComponents
    }

    return (
        <div className={cx(classes.root, className)}>
            {!!label && <label>{label}</label>}
            {isCreatable ? (
                <CreatableSelect
                    formatCreateLabel={createLabel}
                    onChange={onChangeHandler}
                    components={components}
                    {...formState} // from Controller
                    {...fieldProps} // from Controller
                    {...selectProps} // from Component
                />
            ) : (
                <ReactSelect
                    onChange={onChangeHandler}
                    components={components}
                    {...formState}
                    {...fieldProps}
                    {...selectProps}
                />
            )}
            {!!error?.message && (
                <div>
                    <small className={classes.errorMessage}>
                        {error.message}
                    </small>
                </div>
            )}
            {!!helpText && (
                <div>
                    <small>{helpText}</small>
                </div>
            )}
        </div>
    )
}

const MultiValueRemove = (props) => {
    const theme = useTheme()
    
    return (
        <components.MultiValueRemove {...props}>
            <CloseIcon fill={theme.palette.secondary.main} width={20} height={20}/>
        </components.MultiValueRemove>
    )
}

export default Select

Select.propTypes = {
    className: PropTypes.string,
    control: PropTypes.object,
    name: PropTypes.string,
    options: PropTypes.array,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    helpText: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    isSearchable: PropTypes.bool,
    isClearable: PropTypes.bool,
    isCreatable: PropTypes.bool,
    addOptionMessage: PropTypes.bool,
    maxItems: PropTypes.number,
    isMulti: PropTypes.bool,
    onChangeCallback: PropTypes.func,
    closeMenuOnSelect: PropTypes.bool,
    customComponents: PropTypes.object,
    disabled: PropTypes.bool
}