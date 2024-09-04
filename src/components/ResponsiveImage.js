import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
        '& img': {
            flex: 1,
            objectFit: ({ fit }) => fit,
            objectPosition: ({ position }) => position,
        },
    },
}))

const ResponsiveImage = ({
    className,
    media,
    alt = '',
    fit = 'cover',
    position = 'center center',
    sizes = {
        small: 720,
        medium: 720,
        large: 1080,
        original: 'original',
    },
    ...rest
}) => {
    const classes = useStyles({ fit, position })

    return (
        <picture className={cx(classes.root, className)} {...rest}>
            <source media={'(max-width: 440px)'} srcSet={media[sizes.small]} />
            <source media={'(max-width: 768px)'} srcSet={media[sizes.medium]} />
            <source media={'(min-width: 769px)'} srcSet={media[sizes.large]} />
            <img src={media[sizes.original]} alt={alt} />
        </picture>
    )
}

export default ResponsiveImage
