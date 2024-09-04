import { createUseStyles } from 'react-jss'
import { InfoCircle } from '../theme/icons'
import PropTypes from 'prop-types'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: ({variant, data, height, iconSize}) => ({
        ...theme.utils.grid.center,
        ...theme.utils.grid.gapM,
        textAlign: 'left',
        gridTemplateColumns: 'auto 1fr',
        width: '100%',
        minHeight: height ?? 56,
        padding: [0, 18],
        borderRadius: 12,
        color: theme.palette[data].main,
        backgroundColor: theme.palette.tertiary.background,
        textDecoration: 'none',
        ...(variant === 'error' && {
            color: theme.palette.error.main,
            backgroundColor: theme.palette.error.background,
        }),
        fontSize: 12,
        '& svg': {
            height: iconSize,
        },
        '& a': {
            textDecoration: 'none',
            color: theme.palette.secondary.main,
            fontWeight: 400,
            cursor: 'pointer',
        },
    }),
}))

const Banner = ({
                    data = 'tertiary',
                    text,
                    url,
                    icon = <InfoCircle/>,
                    iconSize = 20,
                    variant = 'default',
                    height,
                    className,
                }) => {
    const classes = useStyles({variant, data, height, iconSize})
    return (
        <div className={cx(classes.root, className)}>
            {icon}
            {text}
            {url && (
                <a href={url} target={'_blank'}>
                    {url}
                </a>
            )}
        </div>
    )
}

export default Banner

Banner.propTypes = {
    data: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
}
