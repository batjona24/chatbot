import { createUseStyles } from 'react-jss'
import colors from '../theme/colors'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: {
        background: colors.common.white,
        boxShadow:
            '0px 1px 3px rgba(20, 20, 42, 0.1), 0px 0px 1px rgba(20, 20, 42, 0.05)',
        borderRadius: 12,
        padding: 16,
        position: 'relative',
        [theme.mediaQueries.mUp]: {
            padding: 24,
        },
    },
}))

const Box = ({ children, classNames }) => {
    const classes = useStyles()

    return <div className={cx(classes.root, classNames)}>{children}</div>
}

export default Box
