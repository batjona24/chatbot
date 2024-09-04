import { createUseStyles, useTheme } from 'react-jss'
import React from 'react'
import Button from './Button'
import { CloseIcon, PlayIcon } from '../theme/icons'

const useStyles = createUseStyles((theme) => ({
    root: ({ length }) => ({
        position: 'relative',
        ...theme.utils.flexbox.center,
        height: 158,
        minWidth: 158,
        borderRadius: 12,
        overflow: 'hidden',
        border: !length && ` 2px solid ${theme.palette.disabled.light}`,
    }),
    overlay: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-between',
        flexDirection: 'column',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 2,
        background:
            'linear-gradient(180deg, rgba(39, 8, 51, 0) 26.04%, #270833 100%)',
        padding: theme.spacing,
    },
    buttonWrapper: {
        ...theme.utils.flexbox.spaceBetween,
        flexDirection: 'row-reverse',
        width: '100%',
    },
    button: {
        maxHeight: 24,
        maxWidth: 24,
        borderRadius: 4,
        background: 'rgba(159,159,159,0.3)',
        backdropFilter: 'blur(4px)',
        '-webkit-backdrop-filter': 'blur(4px)',
    },
    mediaInfo: {
        '& p': {
            fontSize: 9,
            fontWeight: 400,
            color: theme.palette.common.white,
        },
    },
    buttonFix: {
        display: 'none',
    },
}))

const MediaThumbnail = ({
    children,
    type,
    count,
    fileName,
    fileSize,
    length,
    handleRemove,
    handlePlay,
    htmlFor,
}) => {
    const theme = useTheme()

    const classes = useStyles({ length })
    return (
        <label className={classes.root} htmlFor={htmlFor}>
            {length && (
                <div className={classes.overlay}>
                    <div className={classes.buttonWrapper}>
                        <Button className={classes.buttonFix} />
                        <Button
                            variant={'borderless'}
                            collapsed={true}
                            icon={
                                <CloseIcon
                                    stroke={theme.palette.common.white}
                                />
                            }
                            className={classes.button}
                            onClick={handleRemove}
                        />
                        {type === 'video' && (
                            <Button
                                variant={'borderless'}
                                collapsed={true}
                                icon={<PlayIcon />}
                                className={classes.button}
                                onClick={handlePlay}
                            />
                        )}
                    </div>
                    <div className={classes.mediaInfo}>
                        <p>
                            {count} OF {length}
                        </p>
                        <p>
                            {fileName} {fileSize}
                        </p>
                    </div>
                </div>
            )}
            {children}
        </label>
    )
}

export default MediaThumbnail
