import {createUseStyles} from 'react-jss'
import {MenuIcon} from '../theme/icons'
import {routeNames} from '../utilities/constants'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {selectUser} from '../store/slices/user'
import {useSelector} from 'react-redux'
import Menu from './Menu'
import Button from './Button'
import UserAvatar from "./UserAvatar";
import colors from "../theme/colors";

const useStyles = createUseStyles((theme) => ({
    root: {
        ...theme.utils.flexbox.spaceBetween,
        position: 'fixed',
        left: 0, right: 0,
        zIndex: 1030,
        gridTemplateColumns: '1fr auto',
        padding: [0, theme.spacing * 2],
        alignItems: 'center',
        height: 80,
        boxShadow: '0px -1px 0px 0px #0000000D inset',
        backgroundColor: colors.common.white,
        '& img': {
            maxWidth: 160,
        },
        [theme.mediaQueries.mUp]: {
            padding: [0, 72],
        },
    },
    info: {
        ...theme.utils.flexbox.center,
        gap: theme.spacing * 2,
        '& svg': {
            cursor: 'pointer',
        },
    },
    userInfo: {
        backgroundColor: '#F3F3F3',
        padding: [6, 12, 6, 8],
        borderRadius: 100,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        color: '#808080',
        fontWeight: 700,
        fontSize: 14,
        cursor: 'pointer',
    },
    logo: {
        cursor: 'pointer',
        color: "#54006d",
        "a": {

        }
    },
    contextSection: {
        '& > span': {
            color: theme.palette.tertiary.main,
            gridTemplateColumns: 'auto 1fr',
            '&:not(:last-child)': {
                borderBottom: `1px solid ${theme.palette.grey[300]}`,
            },
            '&:hover': {
                backgroundColor: theme.palette.tertiary.light,
            },
        },
    },
    link: {
        color: theme.palette.secondary.main,
    },
}))

const Header = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

    const classes = useStyles()

    return (
        <header className={classes.root}>
            <div className={classes.logo}>
                <Link to={"/"}>
                    <h3> Logo </h3>
                </Link>
            </div>
            <div className={classes.info}>
                {user ? (
                    <>
                        <div
                            className={classes.userInfo}
                            onClick={() =>
                                navigate(
                                    `${"".replace(
                                        ':username',
                                        user?.username
                                    )}`
                                )
                            }
                        >
                            <UserAvatar
                                avatar={user?.avatar?.[128]}
                                height={40}
                                width={40}
                                withBoxShadow={false}
                                username={user?.username}
                            />{' '}
                            {user?.username}
                        </div>
                        {/* <MenuIcon onClick={() => setIsSideMenuOpen(!isSideMenuOpen)} width={24}/>
                        <Menu
                            isOpen={isSideMenuOpen}
                            onClose={() => setIsSideMenuOpen(false)}
                        />*/}
                    </>
                ) : (
                    <>
                        <Link className={classes.link} to={routeNames.LOGIN}>
                            Log In
                        </Link>
                        <Button
                            width={140}
                            size={'medium'}
                            variant={'filled'}
                            onClick={() => navigate(routeNames.SIGNUP)}
                        >
                            Sign-Up
                        </Button>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
