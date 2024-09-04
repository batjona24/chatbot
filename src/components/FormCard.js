import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { VerifiedBadgeIcon } from '../theme/icons'
import { getInitials } from '../utilities/helpers'
import colors from '../theme/colors'

const useStyles = createUseStyles((theme) => ({
    root: {
        textAlign: 'left',
        display: 'grid',
        maxWidth: 345,
        gridTemplateColumns: 'auto 1fr auto',
        gridTemplateRows: 'auto',
        gridTemplateAreas: `'image content action'`,
        gap: theme.spacing * 2,
        padding: ({ image }) => (!image ? 16 : '8px 16px 8px 8px'),
        boxShadow:
            '0px 1px 3px rgba(20, 20, 42, 0.1), 0px 0px 1px rgba(20, 20, 42, 0.05)',
        height: ({ image }) => (!image ? 116 : 100),
        borderRadius: theme.spacing * 2,
        cursor: 'pointer',
        margin: [16, 'auto'],
    },
    image: {
        ...theme.utils.grid.center,
        width: 84,
        height: 84,
        gridArea: 'image',
        backgroundColor: ({ color }) =>
            color
                ? theme.palette[color].backgroundLight
                : theme.palette.primary.background,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: ({ image }) => `url('${image}')`,
        borderRadius: 12,
        '& svg': {
            padding: theme.spacing * 2,
            width: 84,
            height: 84,
        },
        fontSize: 28,
        fontWeight: 500,
        color: theme.palette.primary.main,
    },
    content: {
        gridArea: 'content',
        display: 'grid',
        alignContent: 'center',
    },
    overline: ({ hasBadge, image }) => ({
        justifyContent: 'start',
        display: 'flex',
        alignItems: 'center',
        ...(image
            ? {
                  ...theme.typography.small,
                  color: theme.palette.primary.main,
                  textTransform: 'uppercase',
                  fontWeight: 600,
              }
            : {
                  ...theme.typography.label,
                  color: theme.palette.text.primary,
              }),
        '& svg': {
            height: 16,
            marginLeft: 2,
        },
    }),
    text: ({ hasBadge }) => ({
        fontSize: 12,
        fontWeight: 400,
        color: colors.greyscale['400'],
    }),
    description: {
        fontSize: 12,
        fontWeight: 400,
        color: colors.greyscale['400'],
    },
    action: {
        ...theme.utils.grid.center,
        gridArea: 'action',
    },
}))

const FormCard = ({
    image,
    color = 'primary',
    overline,
    text,
    description,
    children,
    className,
    action,
    hasBadge,
}) => {
    const classes = useStyles({ color, image, action, hasBadge })

    return (
        <label className={cx(classes.root, className)}>
            {!!image ? (
                <div className={classes.image} />
            ) : (
                <div className={classes.image}>{getInitials(text)}</div>
            )}
            <div className={classes.content}>
                <div className={classes.overline}>
                    {overline}
                    {hasBadge && <VerifiedBadgeIcon />}
                </div>
                <div className={classes.text}>{text}</div>
                {description && (
                    <div className={classes.description}>{description}</div>
                )}
            </div>
            {children && <div className={classes.action}>{children}</div>}
        </label>
    )
}

export default FormCard

FormCard.propTypes = {
    color: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
}
