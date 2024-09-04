import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: 1030,
        height: 80,
        // [theme.mediaQueries.lUp]: {
        display: 'block',
        // },
    },
    footerContainer: {
        height: '100%',
        borderTop: `1px solid ${theme.palette.grey[200]}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        placeContent: 'center',
        gap: theme.spacing * 2,
        '& a': {
            color: theme.palette.grey[400],
            fontSize: 12,
            fontWeight: 400,
            position: 'relative',
            '&:not(:last-child):after': {
                content: `'/'`,
                padding: [0, 4],
            },
            [theme.mediaQueries.xxs]: {
                fontSize: 10,
            },
        },
        [theme.mediaQueries.lUp]: {
            margin: [0, 72],
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    },
    links: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'auto',
        gap: 4,
        position: 'relative',
        whiteSpace: 'nowrap',
    },
    copyright: {
        color: theme.palette.grey[400],
        fontSize: 12,
        fontWeight: 400,
        justifySelf: 'end',
    },
}))

const Footer = () => {
    const classes = useStyles()

    return (
        <footer className={classes.root}>
            <div className={classes.footerContainer}>
                <div className={classes.links}>
                    <a
                        onClick={() =>
                            window.open(
                                'https://www.iubenda.com/terms-and-conditions/67061878',
                                '_blank'
                            )
                        }
                    >
                        Terms of Service
                    </a>
                    <a
                        onClick={() =>
                            window.open(
                                'https://www.iubenda.com/privacy-policy/67061878',
                                '_blank'
                            )
                        }
                    >
                        Privacy Policy
                    </a>
                    <a
                        onClick={() =>
                            window.open(
                                'https://www.iubenda.com/privacy-policy/67061878/cookie-policy',
                                '_blank'
                            )
                        }
                    >
                        Cookie Policy
                    </a>
                </div>
                <div className={classes.copyright}>©2021 HappyFans</div>
            </div>
        </footer>
    )
}

export default Footer
