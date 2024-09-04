import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: {
        zIndex: 14,
        width: ({ size }) => size,
        height: 'auto',
        animation: '$pulse 1.5s ease-in-out infinite',
    },
    '@keyframes pulse': {
        '0%': {
            transform: 'scale(0.95)',
        },
        '70%': {
            transform: 'scale(1.2)',
        },
        '100%': {
            transform: 'scale(0.95)',
        },
    },
    center: {
        position: ({ overlayFullscreen }) =>
            overlayFullscreen ? 'fixed' : 'absolute',
        left: '50%',
        'margin-left': ({ size }) => -size / 2,
        top: '50%',
        'margin-top': ({ size }) => -size / 2,
    },

    overlay: {
        'z-index': 13,
        position: ({ overlayFullscreen }) =>
            overlayFullscreen ? 'fixed' : 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        'background-color': 'rgba(255, 255, 255, 0.5)',
    },
}))

const Spinner = ({
    className,
    size = 50,
    color = '#333',
    strokeLineCap = 'square',
    overlay = true,
    overlayFullscreen = false,
    center = true,
    ...props
}) => {
    const classes = useStyles({ size, overlayFullscreen })

    return (
        <>
            {overlay && <div className={classes.overlay} />}
            <svg
                className={cx(
                    classes.root,
                    center && classes.center,
                    className
                )}
                viewBox="0 0 36 38"
                {...props}
            >
                <mask
                    id="mask0_3903_18413"
                    style={{ maskType: 'alpha' }}
                    width="20"
                    height="17"
                    x="8"
                    y="0"
                    maskUnits="userSpaceOnUse"
                >
                    <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M8.914.563h18.238v16.24H8.914V.564z"
                        clipRule="evenodd"
                    />
                </mask>
                <g mask="url(#mask0_3903_18413)">
                    <path
                        fill="#E84672"
                        fillRule="evenodd"
                        d="M26.68 6.56C25.485 3.084 22.068.563 18.033.563c-4.038 0-7.456 2.524-8.65 6.002-.25.73-.409 1.5-.447 2.301-.007.135-.022.268-.022.404V11.973h2.568V9.27c0-.061.008-.12.01-.182.022-.762.19-1.488.466-2.16.962-2.349 3.317-4.017 6.075-4.017 2.745 0 5.091 1.653 6.062 3.984.284.68.456 1.417.479 2.191.002.062.01.122.01.184V11.973h2.568V9.271c0-.137-.015-.27-.022-.405a8.314 8.314 0 00-.45-2.306z"
                        clipRule="evenodd"
                    />
                </g>
                <mask
                    id="mask1_3903_18413"
                    style={{ maskType: 'alpha' }}
                    width="36"
                    height="29"
                    x="0"
                    y="9"
                    maskUnits="userSpaceOnUse"
                >
                    <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M.588 9.834H35.23v27.602H.587V9.834z"
                        clipRule="evenodd"
                    />
                </mask>
                <g mask="url(#mask1_3903_18413)">
                    <path
                        fill="#E84672"
                        fillRule="evenodd"
                        d="M26.601 9.834c4.779.014 8.64 3.971 8.627 8.837 0 0 .014.27-.04.751a8.877 8.877 0 01-.714 2.81c-1.396 3.67-5.358 9.624-16.565 15.204-11.207-5.58-15.17-11.534-16.565-15.203a8.878 8.878 0 01-.715-2.81c-.053-.483-.04-.752-.04-.752-.013-4.866 3.849-8.823 8.627-8.837 4.779-.015 8.671 3.919 8.686 8.785h.014c.014-4.866 3.907-8.8 8.685-8.785zm-8.864 21.111c3.602 0 6.521-3.027 6.521-6.763H11.216c0 3.736 2.92 6.763 6.521 6.763zm-5.072-11.11h-1.712c0-1.125-.857-2.039-1.911-2.039s-1.911.914-1.911 2.038H5.419c0-2.13 1.625-3.864 3.623-3.864 1.998 0 3.623 1.733 3.623 3.864zm15.679 0h1.711c0-2.132-1.625-3.865-3.623-3.865-1.997 0-3.623 1.733-3.623 3.864h1.712c0-1.124.857-2.038 1.911-2.038s1.912.914 1.912 2.038z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        </>
    )
}

export default Spinner
