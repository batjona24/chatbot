import { createUseStyles } from 'react-jss'
import { CloseIcon} from '../../theme/icons'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const useStyles = createUseStyles((theme) => ({
    '@keyframes slideRight': {
        '0%': { transform: 'translateX(100%)'},
        '100%': { transform: 'translateX(0%)'},
    },
    '@keyframes slideOut': {
        '0%': { transform: 'translateX(0%)'},
        '100%': { transform: 'translateX(100%)'},
    },
    menu: {
        backgroundColor: theme.palette.secondary.main,
        position: 'fixed',
        width : '80%',
        height: '100%',
        top: 0,
        right: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '29px',
        gap: theme.spacing * 6,
        animationName: '$slideRight ',
        animationDuration: '1s',
    },
    clearIcon: {
        width: '24px',
    },
    menuContainer: {
        position: 'fixed',
        backgroundColor: '#000000B8',
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    menuList: {
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'flex-end',
        gap: theme.spacing * 2,
    }
}))

const ChatBotMenu = ({setIsRecording, setMenuOpen}) => {

    const classes = useStyles()

    const isActiveStyle = {
        color: 'white',
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '32px',
        paddingRight: '3px',
    }

    const inactiveStyle = {
        color: '#FFFFFF52',
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '32px',
        paddingRight: '3px'
    }

    return <div className={classes.menuContainer}>
            <div className={classes.menu}>
                <CloseIcon className={classes.clearIcon} onClick={()=> {setMenuOpen(false)}}/>
                <div className={classes.menuList}>
                    <NavLink to={'/chatbot'} style={({isActive}) => isActive ? isActiveStyle : inactiveStyle } onClick={() => {setMenuOpen(false); setIsRecording(false)}}>Record </NavLink>
                    <NavLink to={'/home'} style={({isActive}) => isActive ? isActiveStyle  : inactiveStyle } onClick={() => {setMenuOpen(false); setIsRecording(false)}}>Home</NavLink>
                </div>
            </div> 
    </div>

}
export default ChatBotMenu