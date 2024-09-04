import { createUseStyles } from 'react-jss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SidePopover from './SidePopover'
import {
    BackArrowIcon,
    FacebookIcon,
    ExitIcon,
    InfoCircle,
    SettingsIcon,
    TwitchIcon,
} from '../theme/icons'
import SocialBarNoColor from './SocialBarNoColor'
import MenuUserInfo from './MenuUserInfo'
import MenuItem from './MenuItem'
import { logout, selectUser } from '../store/slices/user'
import {routeNames} from '../utilities/constants'
import { useNavigate } from 'react-router-dom'

const useStyles = createUseStyles((theme) => ({
    root: {
        ...theme.utils.grid.center,
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'min-content 1fr auto',
        width: '100%',
        overflow: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing * 3,
        padding: theme.spacing * 3,
        '& svg': {
            transform: ({ isOpen }) =>
                isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: theme.transition,
        },
    },
    itemWrapper: {
        ...theme.utils.flexbox.start,
        flexDirection: 'column',
        alignSelf: 'start',
        padding: [0, theme.spacing * 2],
        marginBottom: theme.spacing * 3,
    },
    footer: {
        ...theme.utils.flexbox.center,
        flexDirection: 'column',
        gap: theme.spacing * 2,
        backgroundColor: theme.palette.secondary.main,
        height: 140,
        color: theme.palette.common.white,
        fontSize: 12,
        '& p': {
            color: theme.palette.common.white,
            fontWeight: 700,
        },
    },
    links: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'auto',
        gap: 4,
        position: 'relative',
        whiteSpace: 'nowrap',

        '& a': {
            color: theme.palette.common.white,
            fontWeight: 400,
        },
    },
}))

const Menu = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    const handleLogout = async () => {
        await dispatch(logout())
        navigate(routeNames.LOGIN)
    }

    const classes = useStyles({ isOpen })

    return (
        <menu>
            <SidePopover
                side={'right'}
                isOpen={isOpen}
                bodyClassName={classes.root}
                onClose={onClose}
            >
                <div className={classes.header}>
                    <BackArrowIcon onClick={onClose} />
                    <MenuUserInfo user={user} />
                </div>
                <div className={classes.itemWrapper}>
                    <MenuItem
                        icon={
                            <InfoCircle
                                data-color
                                width={24}
                                stroke={'#ccc'}
                            />
                        }
                        text={'Support and Assistance'}
                        topDivider={true}
                        callback={() => window.open("", '_blank')}
                        onCloseCb={onClose}
                    />
                    <MenuItem
                        icon={
                            <InfoCircle
                                data-color
                                width={24}
                                stroke={'#ccc'}
                            />
                        }
                        text={'Acceptable Use Policy'}
                        topDivider={true}
                        callback={() =>
                            window.open("", '_blank')
                        }
                        onCloseCb={onClose}
                    />
                    <MenuItem
                        icon={
                            <InfoCircle
                                data-color
                                width={24}
                                stroke={'#ccc'}
                            />
                        }
                        text={'Community Guidelines'}
                        topDivider={true}
                        callback={() =>
                            window.open("", '_blank')
                        }
                        onCloseCb={onClose}
                    />
                    <MenuItem
                        icon={
                            <InfoCircle
                                data-color
                                width={24}
                                stroke={'#ccc'}
                            />
                        }
                        text={'Copyright and Trademark Policy'}
                        topDivider={true}
                        callback={() => window.open("", '_blank')}
                        onCloseCb={onClose}
                    />
                    <MenuItem
                        icon={
                            <SettingsIcon
                                data-color
                                width={24}
                                stroke={'#ccc'}
                            />
                        }
                        text={'Settings'}
                        topDivider={true}
                        to={'/settings'}
                        onCloseCb={onClose}
                    />
                    <MenuItem
                        icon={
                            <ExitIcon data-color width={24} stroke={'#ccc'} />
                        }
                        text={'Log Out'}
                        topDivider={true}
                        callback={handleLogout}
                        onCloseCb={onClose}
                    />
                </div>
                <div className={classes.footer}>
                    <p>© 2021 Happyfans</p>
                    <div className={classes.links}>
                        <a href={""} target={'_blank'}>
                            Terms & Conditions
                        </a>
                        /
                        <a
                            href={""}
                            target={'_blank'}
                        >
                            Privacy Policy & Cookie Policy
                        </a>
                    </div>
                    <SocialBarNoColor
                        icons={[
                            <a
                                href={'https://twitter.com/HappyFansToken'}
                                target={'_blank'}
                            >
                                <TwitchIcon />
                            </a>,
                            <a
                                href={'https://www.facebook.com/HappyFansToken'}
                                target={'_blank'}
                            >
                                {' '}
                                <FacebookIcon />
                            </a>,
                            <a
                                href={'https://t.me/happyfanstoken'}
                                target={'_blank'}
                            >
                                {' '}
                                <TwitchIcon />
                            </a>,
                        ]}
                    />
                </div>
            </SidePopover>
        </menu>
    )
}

export default Menu
