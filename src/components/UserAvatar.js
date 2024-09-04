import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router-dom'
import Media from "./Media";

const useStyles = createUseStyles((theme) => ({
    avatar: {
        position: 'relative',
        boxShadow: ({ withBoxShadow }) =>
            withBoxShadow ? '0px 0px 0px 4px #FCFCFC' : 'none',
        width: ({ width }) => width ?? 48,
        height: ({ height }) => height ?? 48,
        borderRadius: '50%',
        cursor: ({username}) => username ? 'pointer' : 'default',
    },
    onlineDot: {
        position: 'absolute',
        bottom: 1,
        right: 1,
        width: ({ dotSize }) => dotSize,
        height: ({ dotSize }) => dotSize,
        borderRadius: '50%',
        backgroundColor: theme.palette.success.main,
        border: `2px solid ${theme.palette.common.white}`,
    },
}))

const UserAvatar = ({
                        isOnline = false,
                        avatar,
                        width,
                        height,
                        dotSize = 12,
                        withBoxShadow = true,
                        username,
                    }) => {
    const navigate = useNavigate()

    const classes = useStyles({ width, height, dotSize, withBoxShadow, username })
    return (
        <Media
            image={avatar ?? null}
            className={classes.avatar}
            onClick={() =>
                username &&
                navigate(``)
            }
        >
            {isOnline && <span className={classes.onlineDot} />}
        </Media>
    )
}

export default UserAvatar
