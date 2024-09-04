import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: ({ gradient, image, variant }) => ({
        position: 'relative',
        background: `${gradient}, url(${image})`,
        'background-image': gradient ? `` : `url(${image})`,
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-size': variant,
    }),
}))

const Media = ({ className, image, variant, children, gradient, ...rest }) => {
    const classes = useStyles({ image, variant, gradient })

    return (
        <div
            onClick={rest.onClick}
            className={cx(classes.root, className)}
            {...rest}
        >
            {children}
        </div>
    )
}

Media.defaultProps = {
    variant: 'cover',
}

Media.propTypes = {
    // image: PropTypes.string.isRequired,
    image: PropTypes.string,
    variant: PropTypes.oneOf(['cover', 'contain', 'fill']),
}

export default Media
