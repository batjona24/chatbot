import { createUseStyles } from 'react-jss'
import { MenuIcon, DoneIcon } from '../theme/icons'
import { useState } from 'react'
import Menu from './Menu'
import { useNavigate } from 'react-router-dom'
import {routeNames} from '../utilities/constants'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/slices/user'

const useStyles = createUseStyles((theme) => ({
    root: {
        ...theme.utils.flexbox.spaceBetween,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1030,
        gridTemplateColumns: '1fr auto',
        padding: [0, theme.spacing * 2],
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.sizing.headerHeightMobile,
        boxShadow: 'inset 0px 1px 0px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#FCFCFC',
        '& img': {
            maxWidth: 160,
        },
        [theme.mediaQueries.mUp]: {
            padding: [0, 72],
        },
    },
    userInfo: {
        ...theme.utils.flexbox.center,
        gap: theme.spacing * 2,
        '& svg': {
            cursor: 'pointer',
        },
    },
}))

const HeaderMobile = () => {
    const navigate = useNavigate()
    const loggedUser = useSelector(selectUser)
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

    const classes = useStyles()

    return (
        <header className={classes.root}>
            <div className={classes.userInfo}>
                <DoneIcon onClick={() => navigate(routeNames.HOME)} />
                {loggedUser && (
                    <MenuIcon
                        onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                    />
                )}
                <Menu
                    isOpen={isSideMenuOpen}
                    onClose={() => setIsSideMenuOpen(false)}
                />
            </div>
        </header>
    )
}

export default HeaderMobile
