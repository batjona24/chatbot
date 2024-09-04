import { createUseStyles, useTheme } from 'react-jss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {routeNames} from '../../../utilities/constants'
import ResetPasswordForm from './reset-password-form'
import { useEffect, useState } from 'react'
import Spinner from '../../../components/Spinner'
import Button from '../../../components/Button'
import Banner from '../../../components/Banner'
import { InfoCircle } from '../../../theme/icons'

const useStyles = createUseStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateRows: '1fr',
        gap: 16,
        alignItems: 'start',
        '& p': {
            alignSelf: 'end',
        },
    },
    content: {
        display: 'grid',
        gridAutoFlow: 'row',
        textAlign: 'center',
        justifyItems: 'center',
        gap: 24,
    },
    title: {
        ...theme.pageStyle.title,
    },
    subtitle: {
        ...theme.pageStyle.sectionTitle,
    },
    wrapper: {
        display: 'grid',
        gap: 16,
        alignSelf: ({ success }) => (success ? 'center' : 'start'),
        justifyItems: ({ success }) => (success ? 'center' : 'unset'),
    },
    iconCard: {
        justifySelf: 'center',
        width: 160,
        height: 160,
        borderRadius: 12,
        backgroundColor: theme.palette.common.white,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundImage: ({ image }) => `url(${image})`,
    },
}))

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [invalidToken, setInvalidToken] = useState(false)
    const [email, setEmail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        validateToken()
    }, [token])

    const validateToken = async () => {
        try {
            const data = {}
        } catch (e) {
            setInvalidToken(true)
        } finally {
            setIsLoading(false)
        }
    }

    const theme = useTheme()
    const classes = useStyles({
        success: isSuccess,
        image: null,
    })

    return (
        <div className={classes.root}>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className={classes.wrapper}>
                    {isSuccess ? (
                        <>
                            <div className={classes.iconCard} />
                            <h5 className={classes.title}>Successful!</h5>
                            <p>
                                You can now use your new password to login to
                                your account
                            </p>
                            <Button
                                width={'100%'}
                                onClick={() => navigate(routeNames.LOGIN)}
                            >
                                Log In
                            </Button>
                        </>
                    ) : (
                        <>
                            <h5 className={classes.title}>
                                Create new password
                            </h5>
                            <p className={classes.subtitle}>
                                Your new password must be different from
                                previous password
                            </p>
                            {invalidToken && (
                                <Banner
                                    variant={'error'}
                                    icon={
                                        <InfoCircle
                                            stroke={theme.palette.error.main}
                                        />
                                    }
                                    text={
                                        'This password reset token is invalid'
                                    }
                                />
                            )}
                            <ResetPasswordForm
                                invalidToken={invalidToken}
                                token={token}
                                email={email}
                                submitCallback={() => setIsSuccess(true)}
                            />
                        </>
                    )}
                </div>
            )}
            <p>
                Did not receive the email? Check your spam filter or{' '}
                <Link to={routeNames.FORGOT_PASSWORD}>
                    try another email address
                </Link>
            </p>
        </div>
    )
}

export default ResetPassword
