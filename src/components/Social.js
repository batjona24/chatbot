import { createUseStyles } from 'react-jss'
import {
    FacebookIcon,
    InstagramIcon,
    SnapchatIcon,
    TiktokIcon,
    TwitterIcon,
    YoutubeIcon,
} from '../theme/icons'
import React from 'react'

const useStyles = createUseStyles((theme) => ({
    root: {
        '& svg': {
            height: 32,
            width: 32,
        },
    },
}))

const socialMap = {
    SnapchatIcon,
    InstagramIcon,
    FacebookIcon,
    YoutubeIcon,
    TwitterIcon,
    TiktokIcon,
}

const urlMap = {
    Snapchat: 'https://snapchat.com/',
    Instagram: 'https://instagram.com/',
    Facebook: 'https://facebook.com/',
    Twitter: 'https://twitter.com/',
    Tiktok: 'https://www.tiktok.com/@',
    Youtube: '',
}

const Social = ({ name, url }) => {
    const iconName = `${name}Icon`
    const DynamicSocialIcon = socialMap[iconName]
    const path = urlMap[name] + url

    const classes = useStyles()
    return (
        <a className={classes.root} href={path} target={'_blank'}>
            <DynamicSocialIcon />
        </a>
    )
}

export default Social
