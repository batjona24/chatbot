import ForgotPasswordForm from "./forgot-password-form"
import {useState} from "react"
import {Link} from "react-router-dom"
import {routeNames} from "../../../utilities/constants"
import {createUseStyles} from "react-jss"
import DoneIcon from "../../../assets/images/Done.svg"

const useStyles = createUseStyles((theme) => ({
    root: {
        padding: [theme.spacing * 2, 0],
        //minHeight: window.innerHeight,
        ...theme.utils.flexbox.center,
        height: '100%'
    },
    card: {
        width: '100%',
        padding: theme.spacing * 3,
        textAlign: 'center',
        ...theme.utils.flexbox.center,
        flexFlow: 'column',
        gap: theme.spacing * 10,
        [theme.mediaQueries.mUp]: {
            ...theme.card,
            width: 600,
            margin: 'auto',
        }
    },
    iconWrapper: {
        width: 120,
        height: 120,
        backgroundImage: ({ image }) => `url(${image})`,
        backgroundColor: theme.palette.common.white,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    },
    title: {
        ...theme.pageStyle.title,
    },
    subtitle: {
        ...theme.pageStyle.sectionTitle,
    },
    changeEmailLink: {
        ...theme.link,
    }

}))

const ForgotPassword = () => {
    const [requestSent, setRequestSent] = useState(false)
    const classes = useStyles({image: DoneIcon})

    return (
        <div className={classes.root}>
            <div className={classes.card}>
                {requestSent ?
                    <>
                        <div className={classes.iconWrapper} />
                        <div>
                            <div>
                                <h5 className={classes.title}>Check your mail</h5>
                                <p className={classes.subtitle}>
                                    We have sent a password recover instructions to your email
                                </p>
                            </div>
                        </div>
                        <p>
                            Did not receive the email? Check your spam filter or{' '}
                            <span
                                className={classes.changeEmailLink}
                                onClick={() => setRequestSent(false)}
                            >
                                try another email address
                            </span>
                        </p>
                    </>
                    :
                    <>
                        <div>
                            <h5 className={classes.title}>Forgot Password?</h5>
                            <p className={classes.subtitle}>
                                Enter the email address you used when you joined and
                                we’ll send you instructions to reset your password
                            </p>
                        </div>
                        <ForgotPasswordForm submitCallback={setRequestSent}/>
                        <div>
                            <p>
                                <Link to={routeNames.LOGIN}>
                                    Return to Log In
                                </Link>
                            </p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default ForgotPassword