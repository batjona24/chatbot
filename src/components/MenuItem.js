import { createUseStyles } from 'react-jss'
import Divider from './Divider'
import { ArrowIcon } from '../theme/icons'
import { NavLink } from 'react-router-dom'
import colors from '../theme/colors'

const useStyles = createUseStyles((theme) => ({
    divider: {
        width: '100%',
        height: 1,
    },
    tab: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gridColumnGap: 24,
        alignItems: 'center',
        cursor: 'pointer',
        fontWeight: 500,
        '& span': {
            transition: theme.transition,
            color: colors.greyscale[500],
        },
        '&:hover': {
            textDecoration: 'none',
            '& span': {
                color: colors.grape[500],
            },
        },
    },
    tabSelected: {
        '& span': {
            color: colors.grape[500],
        },
    },
}))

const MenuItem = ({
    icon,
    to,
    callback = Function.prototype,
    text,
    withArrow = false,
    topDivider = true,
    dividerSpacing = 24,
    onCloseCb = Function.prototype,
}) => {
    const classes = useStyles()

    return (
        <>
            {topDivider && <Divider className={classes.divider} margin={dividerSpacing}/>}
            {to ? (
                <NavLink
                    onClick={onCloseCb}
                    className={(navData) =>
                        navData.isActive
                            ? `${classes.tab} ${classes.tabSelected}`
                            : `${classes.tab}`
                    }
                    to={to}
                >
                    {icon}
                    <span>{text}</span>
                    {withArrow && <ArrowIcon data-color width={34} />}
                </NavLink>
            ) : (
                <div
                    className={classes.tab}
                    onClick={() => {
                        callback()
                        onCloseCb()
                    }}
                >
                    {icon}
                    <span>{text}</span>
                    {withArrow && <ArrowIcon data-color width={34} />}
                </div>
            )}
        </>
    )
}

export default MenuItem
