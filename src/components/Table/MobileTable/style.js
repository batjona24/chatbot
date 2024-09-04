import {createUseStyles} from "react-jss"

const useStyles = createUseStyles((theme) => ({
    thead: {
        ...theme.utils.flexbox.center,
        gap: "0.25rem",
        marginBottom: "1.5rem",
        '& h5': {
            fontSize: 12,
            fontWeight: 600,
            color: theme.palette.grey[800],
            margin: 0
        },
        '& span': {
            fontSize: 12,
            fontWeight: 700,
            color: theme.palette.grey[800],
            ...theme.clickable
        },
        '& svg': {
            width: "0.5rem",
            '& path': {
                fill: theme.palette.grey[800]
            },
            ...theme.clickable
        }
    },
    tr: ({alternatingColors}) => ({
        width: 'calc(100% - 32px)',
        marginLeft: "1rem",
        boxShadow: theme.shadows[80],
        background: theme.palette.common.white,
        marginBottom: "0.5rem",
        borderRadius: "1.5rem",
        padding: [12, "1.5rem"],
        color: theme.palette.grey[800],
        "&:nth-child(even)": (alternatingColors && {
            background: theme.palette.grey[100]
        })
    }),
    td: {
        ...theme.utils.flexbox.spaceBetween,
        flexFlow: 'column',
        gap: "0.25rem",
        '&:not(:last-child)': {
            marginBottom: "1rem"
        },
        [theme.mediaQueries.xxxsUp]: {
            flexFlow: 'row',
            '&:not(:last-child)': {
                marginBottom: "0.5rem"
            },
        }
    },
    tdLabel: {
        ...theme.utils.flexbox.start,
        gap: "0.5rem",
        fontSize: 12,
        '& svg': {
            width: "1rem"
        }
    },
    tdValue: {
        fontSize: 12,
        fontWeight: 600
    },
    expandedRow: {
        width: '100%'
    },
    subRow: {
        width: '100%',
        color: theme.palette.grey[800],
        fontSize: 12
    },
    tbody: ({tbodyHeight}) => ({
        overflowY: 'auto',
        position: 'relative',
        height: [tbodyHeight, '!important'],
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
    rowClickable: {
        ...theme.clickable,
        '&:hover': {
            background: theme.palette.grey[200]
        }
    },
    noResults: {
        paddingTop: "1.5rem",
        fontSize: "1.5rem",
        fontWeight: 500,
        color: theme.palette.grey[500],
        textAlign: 'center'
    }
}))

export default useStyles