import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import Popover from '../../../components/Popover'
import { LogoIcon, MailConfirmationIcon } from '../../../theme/icons'
import Divider from '../../../components/Divider'

const useStyles = createUseStyles((theme) => ({
    root: {
        ...theme.utils.grid.center,
        ...theme.utils.grid.gapS,

        [theme.mediaQueries.xxxsUp]: {
            ...theme.utils.grid.gapM,
        },

        [theme.mediaQueries.mUp]: {
            padding: theme.spacing * 2,
        },

        '& svg': {
            height: 96,
        },
        '& h1': {
            ...theme.typography.h5,
            color: theme.palette.secondary.main,
            whiteSpace: 'nowrap',
        },
        '& h2': {
            ...theme.typography.body1,
        },
        '& p': {
            ...theme.typography.small,
            whiteSpace: 'nowrap',
        },
    },
    mail: {
        color: theme.palette.tertiary.main,
    },
    headerLogo: {
        '& svg': {
            height: 96,
        },
    },
    footerLogo: {
        paddingTop: theme.spacing * 2,
        '& svg': {
            height: 48,
        },
    },
    divider: {
        margin: 0,
    },
}))

const MailConfirmationModal = ({ onClose, email }) => {
    const theme = useTheme()

    // <MailConfirmationModal
    //     email={'mail@example.com'}
    //     onClose={() => setIsMailModalOpen(false)}
    // />

    const classes = useStyles({})
    return (
        <>
            <Popover onClose={onClose}>
                <div className={classes.root}>
                    <div className={classes.headerLogo}>
                        <MailConfirmationIcon />
                    </div>

                    <h1>Email Confirmation</h1>
                    <h2>
                        We have sent email to{' '}
                        <span className={classes.mail}>{email}</span> to confirm
                        the validity of our email address. After receiving the
                        email follow the link provided to complete your
                        registration.
                    </h2>

                    <Divider className={classes.divider} />
                    <p>
                        If you not got any mail
                        <span
                            className={classes.mail}
                            onClick={() => console.log('resend email')}
                        >
                            {' Resend confirmation mail'}
                        </span>
                    </p>
                    <div className={classes.footerLogo}>
                        <LogoIcon />
                    </div>
                </div>
            </Popover>
        </>
    )
}

export default MailConfirmationModal
