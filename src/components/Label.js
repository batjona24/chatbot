import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: ({ color, isLight, minHeight }) => ({
        ...theme.utils.flexbox.center,
        padding: theme.spacing,
        borderRadius: 100,
        fontWeight: 500,
        minHeight: minHeight ?? 32,
        fontSize: 12,
        whiteSpace: 'nowrap',
        color: isLight ? theme.palette[color].main : theme.palette.common.white,
        backgroundColor: `${
            theme.palette[color][isLight ? 'buttonLight' : 'main']
        }`,
    }),
}))

const Label = ({
    color = 'primary',
    minHeight,
    className,
    isLight = false,
    callBack,
    children,
}) => {
    const classes = useStyles({ color, isLight, minHeight })
    return (
        <div className={cx(classes.root, className)} onClick={callBack}>
            {children}
        </div>
    )
}

export default Label
