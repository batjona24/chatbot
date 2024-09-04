import {useDispatch, useSelector} from 'react-redux'
import {createUseStyles} from 'react-jss'
import {Link} from 'react-router-dom'
import SignupForm from './signup-form'
import {
    selectSignupStatus,
    selectUser,
    setSignupStatus,
    updateUser,
} from '../../../store/slices/user'
import {SIGNUP_STATUSES} from './signup-form/signupModel'
import {routeNames} from '../../../utilities/constants'

const useStyles = createUseStyles((theme) => ({

    root: {
        //padding: [theme.spacing * 2, 0],
        ...theme.utils.flexbox.center,
        height: '100%'
    },
    card: {
        width: '100%',
        paddingLeft: theme.spacing * 3,
        paddingRight: theme.spacing * 3,
        textAlign: 'center',
        ...theme.utils.flexbox.center,
        flexFlow: 'column',
        
        [theme.mediaQueries.mUp]: {
            ...theme.card,
            width: 600,
            margin: 'auto',
            gap: theme.spacing * 10,
        },
        '@media only screen and (min-height: 812px)': {
            gap: theme.spacing * 6
        },
        '@media only screen and (max-height: 601px)': {
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

const Signup = () => {
    const user = useSelector(selectUser)
    const step = useSelector(selectSignupStatus)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     return () => {
    //         dispatch(setSignupStatus(SIGNUP_STATUSES.initial))
    //         dispatch(updateUser(null))
    //     }
    // }, [])

    const classes = useStyles({image: null})

    return (
        <div className={classes.root}>
            <div className={classes.card}>
                <div>
                    <h1 className={classes.title}>Registration</h1>
                    <p>Enter the data required to Signup</p>
                </div>
             
                <SignupForm />
                <p>
                    Already have an account?{' '}
                    <Link to={routeNames.LOGIN}>Log In</Link>
                </p>
            </div>   
        </div>
    )
}

export default Signup
