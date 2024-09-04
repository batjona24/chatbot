import { useCallback, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { getExtension } from '../utilities/helpers'

const useStyles = createUseStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingBottom: ({ aspectRatio }) => `calc(${aspectRatio} * 100%)`,
        height: ({ fullHeight }) => (fullHeight ? `100%` : 0),
        backgroundColor: theme.palette.primary.background,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
}))

const ResponsiveVideo = ({
    video,
    type,
    adaptToAspectRatio = false,
    fullHeight = false,
}) => {
    const [aspectRatio, setAspectRatio] = useState(0.5625) // 16:9
    const videoRef = useCallback((node) => {
        if (node !== null && adaptToAspectRatio) {
            node.addEventListener('loadedmetadata', (e) => {
                setAspectRatio(node.videoHeight / node.videoWidth)
            })
        }
    }, [])

    const classes = useStyles({ aspectRatio, fullHeight })

    return (
        <div className={classes.wrapper}>
            <video
                onContextMenu={(e) => {
                    e.preventDefault()
                }}
                ref={videoRef}
                controls
                controlsList="nodownload"
                className={classes.video}
            >
                <source
                    src={`${video}#t=0.1`}
                    type={type ?? `video/${getExtension(video)}`}
                />
                Sorry, your browser doesn't support embedded videos.
            </video>
        </div>
    )
}

export default ResponsiveVideo
