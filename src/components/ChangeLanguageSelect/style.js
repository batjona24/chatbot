import {createUseStyles} from "react-jss"

export default createUseStyles(theme => ({
    select: {
        width: "max-content",
        height: 38,
        ...theme.utils.flexbox.center,
        cursor: "pointer",
        "& span": {
            fontSize: 12,
            fontWeight: 500,
            color: theme.palette.grey[600]
        },
        "& svg": {
            width: "1rem",
            fill: theme.palette.grey[600]
        }
    },
    modalBody: {
        padding: "1rem"
    },
    option: {
        padding: "1rem",
        fontSize: 18,
        fontWeight: 500,
        color: theme.palette.grey[600],
        cursor: "pointer",
        ...theme.utils.flexbox.spaceBetween,
        gap: "1rem",
        "&:not(:last-child)": {
            borderBottom: `1px solid ${theme.palette.grey[300]}`
        },
        "&:hover": {
            background: theme.palette.grey[200]
        },
        "& svg": {
            width: 18,
            height: 18,
            "& path": {
                fill: theme.palette.grey[600]
            }
        }
    }
}))

export const getSelectStyle = (theme) => ({
    container: (defaults) => ({
        ...defaults,
        width: "max-content"
    }),
    control: (defaults) => ({
        ...defaults,
        cursor: "pointer",
        border: "none",
        boxShadow: "none",
        backgroundColor: 'transparent'

    }),
    valueContainer: (defaults) => ({
        ...defaults,
        padding: 0
    }),
    singleValue: (defaults) => ({
        ...defaults,
        margin: 0,
        fontSize: 18,
        fontWeight: 700,
        fontFamily: theme.typography.chatBotFontFamily,
        color: theme.palette.common.black
    }),
    indicatorsContainer: (defaults) => ({
        ...defaults,
        "& > div": {
            padding: 0,
        },
        "& svg": {
            width: "1rem",
            fill: theme.palette.grey[600]
        }
    }),
    indicatorSeparator: () => ({
        display: "none"
    }),
    menu: (defaults) => ({
        ...defaults,
        zIndex: 20,
        width: 90,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: `0 0 2px 1px ${theme.palette.grey[300]}`
    }),
    menuList: (defaults) => ({
        ...defaults,
        padding: 0,
        margin: 4
    }),
    option: (defaults, {isFocused, isSelected}) => ({
        ...defaults,
        fontSize: 12,
        fontWeight: 500,
        padding: 4,
        color: theme.palette.grey[600],
        ...((isFocused) && {
            backgroundColor: `${theme.palette.grey[200]} !important`,
        }),
        ...((isSelected) && {
            backgroundColor: `${theme.palette.grey[300]} !important`,
        }),
        ...(isSelected && {fontWeight: 700}),
    })
})