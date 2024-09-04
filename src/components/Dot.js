import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
    root: ({ colorVariant }) => ({
        width: 6,
        height: 6,
        backgroundColor: theme.palette[colorVariant].main,
        borderRadius: 10,
    }),
}))

const Dot = ({ colorVariant = 'primary' }) => {
    const classes = useStyles({ colorVariant })
    return <div className={classes.root}></div>
}

export default Dot

Dot.propTypes = {
    colorVariant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
}
