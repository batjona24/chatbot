import '@fontsource/rubik/700.css'
import '@fontsource/rubik/500.css'
import '@fontsource/rubik/300.css'
import '@fontsource/rubik/400.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import "@fontsource/poppins"
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/900.css'

const defaultFontFamily = `'Rubik', sans-serif`
const secondaryFontFamily = `'Roboto', sans-serif`
const chatBotFontFamily = `"Poppins"`
const fontSize = 14 // px
const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
}
const caseAllCaps = {
    textTransform: 'uppercase',
}
const htmlFontSize = 16 // 16px is the default font-size used by browsers.
const coef = fontSize / 14
const pxToRem = (size) => (size / htmlFontSize) * coef
const buildVariant = ({
    fontFamily = chatBotFontFamily,
    fontWeight = fontWeights.regular,
    minSize,
    maxSize,
    lineHeight = 1.4,
    letterSpacing,
    casing = {},
}) => ({
    fontFamily,
    fontWeight,
    fontSize: `max(${
        minSize ?? pxToRem(maxSize)
    }rem, min(1rem + 16vw, ${pxToRem(maxSize)}rem))`,
    letterSpacing,
    lineHeight,
    ...casing,
})

const typography = {
    h1: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 2,
        maxSize: 64,
        letterSpacing: -1.5,
    }),
    h2: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 1.5,
        maxSize: 52,
        letterSpacing: -0.5,
    }),
    h3: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 1.17,
        maxSize: 48,
        letterSpacing: 0,
    }),
    h4: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 1,
        maxSize: 35,
        letterSpacing: 0.25,
    }),
    h5: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 0.83,
        maxSize: 20,
        letterSpacing: 0,
    }),
    h6: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 0.75,
        maxSize: 20,
        letterSpacing: 0.15,
    }),
    subtitle1: buildVariant({
        maxSize: 16,
        letterSpacing: 0.15,
    }),
    subtitle2: buildVariant({
        maxSize: 14,
        letterSpacing: 0.1,
    }),
    body1: buildVariant({
        fontFamily: secondaryFontFamily,
        minSize: 1,
        maxSize: 16,
        letterSpacing: 0.5,
    }),
    body2: buildVariant({
        fontFamily: secondaryFontFamily,
        maxSize: 14,
        letterSpacing: 0.25,
    }),
    buttonSmall: buildVariant({
        fontFamily: secondaryFontFamily,
        fontWeight: fontWeights.bold,
        maxSize: 14,
        letterSpacing: 0.75,
    }),
    buttonMedium: buildVariant({
        fontFamily: secondaryFontFamily,
        fontWeight: fontWeights.bold,
        maxSize: 16,
        letterSpacing: 1,
    }),
    buttonBig: buildVariant({
        fontFamily: secondaryFontFamily,
        fontWeight: fontWeights.bold,
        maxSize: 18,
        letterSpacing: 1.25,
    }),
    caption: buildVariant({
        fontFamily: secondaryFontFamily,
        maxSize: 12,
        letterSpacing: 0.4,
    }),
    overline: buildVariant({
        fontFamily: secondaryFontFamily,
        maxSize: 10,
        letterSpacing: 1.5,
    }),
    paragraph: buildVariant({
        fontFamily: chatBotFontFamily,
        maxSize: 18,
        letterSpacing: 0.5,
    }),
    label: buildVariant({
        fontFamily: secondaryFontFamily,
        maxSize: 14,
        letterSpacing: 0.5,
        fontWeight: fontWeights.bold,
    }),
    link: buildVariant({
        fontFamily: secondaryFontFamily,
        maxSize: 18,
        letterSpacing: 0.75,
        lineHeight: 1.7,
    }),
    small: buildVariant({
        fontFamily: secondaryFontFamily,
        maxSize: 12,
        letterSpacing: 0.5,
    }),
  
    fontWeights,
    pxToRem,
    defaultFontFamily,
    secondaryFontFamily,
    chatBotFontFamily,
    defaultFontSize: htmlFontSize,
    caseAllCaps,
}

export default typography
