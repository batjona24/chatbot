import { create } from 'jss'
import "bootstrap/dist/css/bootstrap.css"
import preset from 'jss-preset-default'
import mainPalette from './palette'
import shadows from './shadows'
import typography from './typography'
import resetCss from './reset'
import {mediaQueries, breakpoints} from "./responsive"
import utils from "./utils"

// Currently supported theme names ['light', 'dark']
export const getAppTheme = ({ name = 'light', direction = 'ltr' } = {}) => {
    const palette = mainPalette[name]
    const spacing = 8
    const transition = "ease-in-out 400ms"

    const zIndex = {
        modal: 1300,
        modalOverlay: 1299,
        snackbar: 1400,
        tooltip: 1500,
        alert: 1800
    }
    const sizing = {
        headerHeight: 80,
        headerHeightMobile: 72,
    }
    const controls = {
        label: {
            ...typography.label,
            position: 'relative',
            color: palette.grey[600],
            // margin: [16, 0, 4],
        },
        input: {
            ...typography.paragraph,
            letterSpacing: 0.5,
            boxSizing: 'border-box',
            position: 'relative',
            width: '100%',
            border: `2px solid`,
            borderColor: palette.grey[300],
            borderRadius: 12,
            color: palette.input.active,
            padding: spacing * 2,
            outline: 'none',
            textAlign: 'left',
            transition,
            '&::placeholder': {
                color: palette.input.placeholder,
            },
            '&:hover': {
                borderColor: palette.grey[400],
            },
            '&:focus': {
                borderColor: palette.tertiary.main,
            },
            '&[readonly], &[disabled]': {
                cursor: 'default',
                border: `none`,
                backgroundColor: palette.disabled.light,
                color: palette.grey[400],
            },
            '&:-webkit-autofill': {
                WebkitBackgroundClip: 'text',
            },
        },
        inputError: {
            extend: 'input',
            borderColor: palette.error.light,
            '& svg': {
                color: palette.error.main,
            },
            '&:focus': {
                borderColor: palette.error.light,
            },
        },
        inputSuccess: {
            extend: 'input',
            borderColor: palette.success.light,
            '& svg': {
                color: palette.success.main,
            },
            '&:focus': {
                borderColor: palette.success.light,
            },
        },
        inputWarning: {
            extend: 'input',
            borderColor: palette.warning.light,
            '& svg': {
                color: palette.warning.main,
            },
            '&:focus': {
                borderColor: palette.warning.light,
            },
        },
        textarea: {
            border: `2px solid`,
            borderColor: palette.grey[300],
            transition,
        },
        textareaError: {
            extend: 'textarea',
            borderColor: palette.error.light,
            transition,
            '& svg': {
                color: palette.error.main,
            },
            '&:focus': {
                borderColor: palette.error.light,
            },
        },
        small: {
            ...typography.small,
            color: palette.grey[500],
        },
    }
    const alerts = {
        default: {
            color: palette.tertiary.main,
            backgroundColor: palette.tertiary.background,
            borderColor: palette.tertiary.light,
        },
        success: {
            color: palette.success.main,
            backgroundColor: palette.success.background,
            borderColor: palette.success.light,
        },
        error: {
            color: palette.error.main,
            backgroundColor: palette.error.background,
            borderColor: palette.error.light,
        },
        warning: {
            color: palette.warning.main,
            backgroundColor: palette.warning.background,
            borderColor: palette.warning.light,
        }
    }

    const clickable = {
        transition,
        cursor: 'pointer',
    }

    const pageStyle = {
        title: {
            color: palette.secondary.main,
            fontSize: 28,
            letterSpacing: 0.25,
            fontWeight: typography.fontWeights.bold,
            marginBottom: 8,
        },
        sectionTitle: {
            color: palette.grey[600],
            fontSize: 16,
            letterSpacing: 0.5,
            fontWeight: typography.fontWeights.regular,
            fontFamily: typography.secondaryFontFamily,
        },
        modalTitle: {
            color: palette.secondary.darker,
            fontSize: 18,
            letterSpacing: 0.5,
            fontWeight: typography.fontWeights.bold,
            fontFamily: typography.secondaryFontFamily,
        },
    }

    const link = {
        ...clickable,
        textDecoration: 'none',
        color: palette.link.normal,
        fontWeight: 600,
        '&:hover': {
            textDecoration: 'underline',
            color: palette.link.normal,
        },
        '&:visited': {
            color: palette.link.visited,
        }
    }

    const card = {
        background: palette.common.white,
        boxShadow: shadows[100],
        borderRadius: spacing * 3,
        padding: spacing * 3,
        ...utils.flexbox.center,
        flexFlow: 'column'
    }

    const jssInstance = create(preset())

    if (process.env.NODE_ENV === 'production') {
        jssInstance.setup({ id: { minify: true } })
    }
    jssInstance
        .createStyleSheet(
            {
                ...resetCss,
                '@global': {
                    'html, body, #root': {
                        height: '100%',
                        fontFamily: typography.secondaryFontFamily,
                        fontSize: typography.defaultFontSize,
                        color: palette.text.body,
                        backgroundColor: palette.background.body,
                        '-webkit-font-smoothing': 'antialiased',
                        '-moz-osx-font-smoothing': 'grayscale',
                    },
                    body: {
                        minHeight: window.innerHeight,
                    },
                    'h1, h2, h3, h4, h5, h6, p, span, small': {
                        marginBottom: 0,
                    },
                    'label, input, textarea, select, button': {
                        fontFamily: 'inherit',
                    },
                    a: link,
                    h1: typography.h1,
                    h2: typography.h2,
                    h3: typography.h3,
                    h4: typography.h4,
                    h5: typography.h5,
                    h6: typography.h6,
                    p: { ...typography.paragraph, color: palette.grey[600] },
                    label: controls.label,
                    input: controls.input,
                    small: controls.small,
                    textarea: {
                        ...controls.input,
                        overflowWrap: 'break-word',
                    },
                    form: {
                        textAlign: 'left',
                    },
                    '@keyframes spin': {
                        '100%': {
                            '-webkit-transform': 'rotate(360deg)',
                            transform: 'rotate(360deg)',
                        },
                    },
                },
            },
            { index: 1, meta: 'globals' }
        )
        .attach()

    return {
        breakpoints,
        mediaQueries,
        zIndex,
        sizing,
        spacing,
        palette,
        shadows,
        typography,
        controls,
        alerts,
        utils,
        pageStyle,
        link,
        clickable,
        card,
        transition
    }
}
