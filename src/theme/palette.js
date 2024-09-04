import colors from './colors'

const neutral = {
    common: colors.common,
    grey: colors.greyscale,
    transparency: colors.transparency,
    gradients: colors.gradients,
}

const palette = {
    light: {
        ...neutral,
        primary: {
            main: colors.cherry[50],
            dark: colors.cherry[600],
            darker: colors.cherry[800],
            background: colors.cherry['A05'],
            buttonLight: colors.cherry[100],
            buttonHover: colors.cherry['A15'],
            hover: colors.cherry[200],
        },
        secondary: {
            main: colors.grape[50],
            dark: colors.grape[600],
            darker: colors.grape[800],
            background: colors.grape[700],
            backgroundLight: colors.grape['A05'],
            buttonLight: colors.grape[100],
            buttonHover: colors.grape['A15'],
            hover: colors.grape[200],
        },
        tertiary: {
            light: colors.violet[100],
            main: colors.violet[500],
            dark: colors.violet[600],
            background: '#FBF9FE',
            buttonLight: colors.violet[100],
            buttonHover: colors.violet['A15'],
            hover: colors.violet[200],
        },
        success: {
            light: colors.green[400],
            main: colors.green[500],
            background: '#F3FEF3',
        },
        error: {
            light: colors.red[400],
            main: colors.red[500],
            transparency: colors.red['A75'],
            background: '#FEF5F3',
        },
        warning: {
            light: colors.yellow[400],
            main: colors.yellow[500],
            background: '#FFFDF5',
        },
        disabled: {
            light: colors.greyscale[200],
            main: colors.greyscale[400],
        },
        background: {
            header: colors.cherry.A10,
            body: colors.greyscale[50],
            section: colors.common.white,
        },
        text: {
            primary: colors.grape[800],
            secondary: colors.greyscale[600],
            inactive: colors.greyscale[400],
            disabled: colors.greyscale[400],
        },
        link: {
            normal: colors.violet[50],
            visited: colors.grape[10],
        },
        icon: {
            active: colors.grape[500],
            inactive: colors.greyscale[400],
        },
        action: {
            active: colors.grape[500],
            inactive: colors.greyscale[500],
        },
        divider: {
            active: colors.cherry[500],
            external: colors.greyscale[300],
            internal: colors.greyscale[200],
        },
        input: {
            active: colors.greyscale[700],
            placeholder: colors.greyscale[400],
        },
        chip: {
            primary: colors.cherry[500],
            secondary: colors.grape[500],
            tertiary: colors.violet[500]
        },
    },
    dark: {
        ...neutral,
        primary: {
            main: colors.cherry[100],
            dark: colors.cherry[200],
            darker: colors.cherry[300],
        },
        secondary: {
            main: colors.grape[100],
            dark: colors.grape[200],
            darker: colors.grape[300],
        },
        tertiary: {
            main: colors.violet[500],
            dark: colors.violet[600],
            background: colors.violet[100],
        },
        success: {
            light: colors.green[400],
            main: colors.green[500],
            background: colors.green[100],
        },
        error: {
            light: colors.red[400],
            main: colors.red[500],
            background: colors.red[100],
        },
        warning: {
            light: colors.yellow[400],
            main: colors.yellow[500],
            background: colors.yellow[100],
        },
        disabled: {
            light: colors.greyscale[400],
            main: colors.greyscale[500],
        },
        background: {
            body: colors.greyscale[700],
            section: colors.common.white,
        },
        text: {
            primary: colors.grape[300],
            secondary: colors.greyscale[50],
            body: colors.greyscale[600],
            inactive: colors.greyscale[300],
            disabled: colors.greyscale[200],
        },
        link: {
            normal: colors.violet[50],
            visited: colors.grape[10],
        },
        icon: {
            active: colors.grape[500],
            inactive: colors.greyscale[400],
        },
        action: {
            active: colors.grape[300],
            inactive: colors.greyscale[300],
        },
        divider: {
            active: colors.cherry[500],
            external: colors.greyscale[200],
            internal: colors.greyscale[100],
        },
        input: {
            active: colors.greyscale[500],
            placeholder: colors.greyscale[200],
        },
        chip: {
            primary: colors.cherry[100],
            secondary: colors.grape[100],
            tertiary: colors.violet[500]
        },
    },
}

export default palette
