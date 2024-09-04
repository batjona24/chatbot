import * as yup from 'yup'

const RESET_PASSWORD_MODEL = {
    password: 'password',
    confirmPassword: 'confirm_password',
}

const forgotPasswordValidationSchema = yup.object().shape({
    [RESET_PASSWORD_MODEL.password]: yup
        .string()
        .required('Password is mandatory')
        .min(6, 'Password too short')
        .matches(
            /^(?=.*[0-9])(?=.*[!#$%&*+\-./:;=?@\\^_])(?=.*[A-Z])[a-zA-Z0-9!#$%&*+\-./:;=?@\\^_]{6,16}$/,
            'Password must include at least one number, one uppercase letter and one special character.'
        ),

    [RESET_PASSWORD_MODEL.confirmPassword]: yup
        .string()
        .required('Password is mandatory')
        .oneOf(
            [yup.ref(RESET_PASSWORD_MODEL.password), null],
            'Both passwords must match'
        ),
})

export {
    RESET_PASSWORD_MODEL,
    forgotPasswordValidationSchema as validationSchema,
}
