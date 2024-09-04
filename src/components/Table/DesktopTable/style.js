import {createUseStyles} from "react-jss"

const useStyles = createUseStyles((theme) => ({
    table: {
        lineHeight: 1,
        boxShadow: theme.shadows[80],
        borderTopLeftRadius: "1.5rem",
        borderTopRightRadius: "1.5rem"
    },
    thead: {
        ...theme.utils.flexbox.start,
        flexWrap: 'wrap',
        height: "3.5rem",
        padding: [0, "1.5rem", 0, "1rem"],
        background: theme.palette.grey[200],
        borderTopLeftRadius: "1.5rem",
        borderTopRightRadius: "1.5rem",
        borderBottom: `1px solid ${theme.palette.grey[400]}`
    },
    tbody: ({tbodyHeight}) => ({
        position: 'relative',
        height: [tbodyHeight, '!important'],
        background: theme.palette.common.white,
        overflowY: ['scroll', '!important'],
        '&::-webkit-scrollbar': {
            width: "0.5rem",
            background: theme.palette.grey[200],
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[400],
            borderRadius: "0.5rem",
            '&:hover': {
                backgroundColor: theme.palette.grey[600]
            }
        }
    }),
    tfoot: {
        padding: [0, "1rem"],
        borderTop: `2px solid ${theme.palette.grey[400]}`
    },
    th: {
        ...theme.utils.flexbox.center,
        gap: "0.25rem",
        padding: [0, "0.5rem"],
        '& svg': {
            width: 18,
            fill: theme.palette.grey[800]
        },
        '& > span': {
            fontSize: 14,
            fontWeight: 700,
            color: theme.palette.grey[800],
            ...theme.utils.truncateText
        }
    },
    sorter: {
        '& svg': {
            width: "0.5rem",
            '& path': {
                fill: theme.palette.grey[800]
            },
            ...theme.clickable
        }
    },
    tr: ({alternatingColors}) => ({
        ...theme.utils.flexbox.start,
        flexWrap: 'wrap',
        padding: [0, "1rem"],
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        background: theme.palette.common.white,
        "&:nth-child(even)": (alternatingColors && {
            background: theme.palette.grey[100]
        })
    }),
    td: {
        ...theme.utils.flexbox.center,
        minHeight: "3.5rem",
        padding: [0, "0.5rem"],
        '& > span': {
            fontSize: 12,
            fontWeight: 500,
            color: theme.palette.grey[800],
            ...theme.truncateText
        }
    },
    expandedRow: {
        width: '100%'
    },
    subRow: {
        width: '100%',
        color: theme.palette.grey[800],
        fontSize: 12
    },
    rowClickable: {
        ...theme.clickable,
        '&:hover': {
            background: theme.palette.grey[200]
        }
    },
    noResults: {
        '& > span': {
            paddingTop: "1.5rem",
            fontSize: "1.5rem",
            fontWeight: 500,
            color: theme.palette.grey[500],
            textAlign: 'center',
        }
    },
    left: theme.utils.flexbox.start,
    center: theme.utils.flexbox.center,
    right: theme.utils.flexbox.end
}))


export default useStyles