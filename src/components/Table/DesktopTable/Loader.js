import cx from "classnames"
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles((theme) => ({
    loader: {
        width: '100%',
        height: theme.spacing * 2,
        borderRadius: theme.spacing,
        background: 'linear-gradient(to right, #eee 20%, #ddd 50%, #eee 80%)',
        backgroundSize: '200px 16px',
        animation: '$moving-gradient 1s infinite linear forwards'
    },
    '@keyframes moving-gradient': {
        '0%': {
            backgroundPosition: '-100px 0'
        },
        '100%': {
            backgroundPosition: '100px 0'
        }
    },
    left: theme.flexbox.start,
    center: theme.flexbox.center,
    right: theme.flexbox.end
}))

const Loader = ({
    className,
    singleLoaderClassName,
    columns
}) => {
    const classes = useStyles()

    return (
        Array.from(Array(5).keys()).map((row, index) => (
            <div
                className={className}
                key={index}
            >
                {columns.map((column, index) => (
                    <div
                        className={cx(classes[column.alignment], singleLoaderClassName)}
                        style={{width: column.width}}
                        key={index}
                    >
                        <span className={classes.loader}/>
                    </div>
                ))}
            </div>
        ))
    )
}

export default Loader