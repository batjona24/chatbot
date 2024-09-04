import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'
import UserAvatar from "./UserAvatar";

const useStyles = createUseStyles((theme) => ({
    root: {
        display: 'flex',
        gap: theme.spacing * 2,
        alignItems: 'center',
    },
    avatar: {
        position: 'relative',
        width: 48,
        height: 48,
        borderRadius: '50%',
    },
    info: {},
    name: {
        fontWeight: 700,
        color: theme.palette.secondary.main,
        fontSize: 18,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    profile: {
        '& a': {
            fontSize: 12,
            color: theme.palette.grey[600],
            fontWeight: 400,
        },
    },
}))

const MenuUserInfo = ({ user }) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <UserAvatar
                isOnline={false}
                avatar={user?.avatar?.[128]}
                username={user?.username}
            />
            <div className={classes.info}>
                <div className={classes.name}>{user?.display_name}</div>
                <div className={classes.profile}>
                    <Link to={`/${user?.username}`}>View your profile</Link>
                </div>
            </div>
        </div>
    )
}

export default MenuUserInfo
