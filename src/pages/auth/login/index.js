import { createUseStyles } from 'react-jss'
import LoginForm from './login-form'
import { Link } from 'react-router-dom'
import {routeNames} from '../../../utilities/constants'
import {Trans, useTranslation} from "react-i18next"

const useStyles = createUseStyles((theme) => ({
    root: {
        //padding: [theme.spacing * 2, 0],
        ...theme.utils.flexbox.center,
        height: '100%',
    },
    card: {
        width: '100%',
        padding: theme.spacing * 3,
        textAlign: 'center',
        ...theme.utils.flexbox.center,
        flexFlow: 'column',
        gap: theme.spacing * 2,
        [theme.mediaQueries.mUp]: {
            ...theme.card,
            width: 600,
            margin: 'auto',
            gap: theme.spacing * 10,
        },
        '@media only screen and (min-height: 812px)': {
            gap: theme.spacing * 6
        },
        '@media only screen and (max-height: 714px)': {
            gap: theme.spacing 
        },
        
    },
    title: {
        ...theme.pageStyle.title,
    },
    subtitle: {
        ...theme.pageStyle.sectionTitle,
    },
    forgotPassword: {
        marginBottom: theme.spacing * 2
    },
}))

const Login = () => {
    const {t} = useTranslation()
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.card}>
                <div>
                    <h5 className={classes.title}>
                        {t("auth:login_in_account")}
                    </h5>
                    <p className={classes.subtitle}>
                        {t("auth:enter_data")}
                    </p>
                </div>
                <LoginForm />
                <div>
                    <p className={classes.forgotPassword}>
                        <Link to={routeNames.FORGOT_PASSWORD}>
                            {t("auth:forgot_password")}
                        </Link>
                    </p>
                    <p>
                        <Trans
                            i18nKey="auth:dont_have_account"
                            components={[<Link to={routeNames.SIGNUP}/>]}
                        />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
