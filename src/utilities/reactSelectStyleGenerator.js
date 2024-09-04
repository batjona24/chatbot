//React select styles - https://react-select.com/styles

export const reactSelectsStyleGenerator = (
    theme,
    isMulti,
    isCreatable,
    error,
    isTouched,
    disabled,
    singleValueCustomStyle,
    optionCustomStyle,
    menuCustomStyle,
    multiValueLabelCustomStyle,
    multiValueCustomStyle,
) => ({
    placeholder: (defaults, state) => ({
        ...defaults,
        color: theme.palette.grey[400],
        fontWeight: 400,
        fontSize: 14,
        margin: isMulti ? '0 10px' : 0,
    }),
    valueContainer: (defaults, state) => ({
        ...defaults,
        fontSize: 16,
        padding: 0,
        gap: 4,
    }),
    singleValue: (defaults, {isDisabled, isFocused,}) => ({
        ...defaults,
        ...(singleValueCustomStyle && singleValueCustomStyle),
    }),
    control: (defaults, {isDisabled, isFocused}) => ({
        ...defaults,
        ...theme.controls.input,
        padding: isMulti ? '6px 16px 6px 6px' : '14px 16px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        borderColor: `${theme.palette.grey[300]} !important`,
        ...(isDisabled && {
            borderColor: `${theme.palette.grey[200]} !important`,
        }),
        ...(isFocused && {
            borderColor: `${theme.palette.tertiary.main} !important`,
        }),
        ...(error && {
            borderColor: `${theme.palette.error.main} !important`,
            svg: {
                fill: theme.palette.error.main,
            },
        }),
        ...(!error &&
            isTouched &&
            !disabled && {
                borderColor: `${theme.palette.success.main} !important`,
                svg: {
                    fill: theme.palette.success.main,
                },
            }),
        boxShadow: isFocused ? `0 0 0 2px ${theme.shadows[40]}` : `none`,
    }),
    option: (provided, {isDisabled, isFocused, isSelected}) => ({
        ...provided,
        color: isDisabled
            ? theme.palette.grey[200]
            : theme.palette.tertiary.main,
        padding: `12px 16px`,
        ...((isFocused || isSelected) && {
            backgroundColor: `${theme.palette.tertiary.light} !important`,
        }),
        ...(isSelected && {fontWeight: 700}),
        ...(optionCustomStyle && optionCustomStyle),
        fontSize: 14,
        borderRadius: 4,
    }),
    indicatorsContainer: (defaults) => ({
        ...defaults,
        display: 'flex',
        alignItems: 'start',
        backgroundColor: 'transparent',
        padding: isMulti ? '8px 0' : 0,
        '& svg': {
            fill: theme.palette.grey[300],
        },
    }),
    indicatorSeparator: (defaults) => ({
        ...defaults,
        width: 0,
        padding: 0,
    }),
    menu: (defaults) => ({
        ...defaults,
        zIndex: 20,
        borderRadius: 10,
        overflow: 'hidden',
    }),
    menuList: (defaults) => ({
        ...defaults,
        padding: 0,
        margin: 8,
        ...(menuCustomStyle && menuCustomStyle),
    }),
    dropdownIndicator: (defaults) => ({
        ...defaults,
        padding: '2px',
    }),
    clearIndicator: (defaults) => ({
        ...defaults,
        borderRadius: '50px',
        marginRight: 4,
        padding: 2,
        backgroundColor: 'transparent',
    }),
    multiValueLabel: (defaults) => ({
        ...defaults,
        textTransform: isCreatable ? 'uppercase' : 'none',
        padding: 0,
        color: '#6B2D66',
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: 0.5,
        ...(multiValueLabelCustomStyle && multiValueLabelCustomStyle),
    }),
    multiValue: (defaults, state) => ({
        ...defaults,
        margin: 0,
        padding: '10px 4px',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(121, 65, 117, 0.05)',
        ...(multiValueCustomStyle && multiValueCustomStyle),
    }),
    multiValueRemove: (defaults, state) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
    })
})
