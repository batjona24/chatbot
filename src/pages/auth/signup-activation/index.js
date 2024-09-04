import React, { useEffect, useState } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import {routeNames} from '../../../utilities/constants'
import Banner from '../../../components/Banner'
import { InfoCircle } from '../../../theme/icons'
import Spinner from '../../../components/Spinner'

const useStyles = createUseStyles((theme) => ({
    root: {},
    wrapper: {
        display: 'grid',
        gap: 16,
        alignSelf: ({ success }) => (success ? 'center' : 'start'),
        justifyItems: ({ success }) => (success ? 'center' : 'unset'),
    },
    title: {
        ...theme.pageStyle.title,
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

const SignupActivation = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [invalidToken, setInvalidToken] = useState(true)
    const [status, setStatus] = useState('')
    const { token } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        validateToken()
    }, [token])

    const validateToken = async () => {
        setIsLoading(true)
        try {
            const data = {}
        } catch (e) {
            setStatus('Invalid token')
        } finally {
            setIsLoading(false)
        }
    }

    const classes = useStyles({ image: null, success: !invalidToken })
    const theme = useTheme()
    return isLoading ? (
        <Spinner />
    ) : (
        <div className={classes.wrapper}>
            {invalidToken ? (
                <>
                    <Banner
                        variant={'error'}
                        text={status}
                        icon={<InfoCircle stroke={theme.palette.error.main} />}
                    />
                    <Link to={routeNames.LOGIN}>Go back to Login</Link>
                </>
            ) : (
                <>
                    <div className={classes.iconCard} />
                    <h5 className={classes.title}>Email Confirmed</h5>
                    <p>
                        Your email address has been successfully confirmed.
                        Press the button continue to login
                    </p>
                    <Button
                        width={'100%'}
                        onClick={() => navigate(routeNames.LOGIN)}
                    >
                        Log In
                    </Button>
                </>
            )}
        </div>
    )
}

export default SignupActivation
