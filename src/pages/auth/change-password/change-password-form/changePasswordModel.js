import * as yup from 'yup'

const CHANGE_PASSWORD_MODEL = {
    newPassword: 'password',
    confirmPassword: 'password_confirmation',
}

const changePasswordValidationSchema = yup.object().shape({
    [CHANGE_PASSWORD_MODEL.newPassword]: yup
        .string()
        .required('New password is mandatory')
        .min(6, 'Password too short')
        .matches(
            /^(?=.*[0-9])(?=.*[!#$%&*+\-./:;=?@\\^_])(?=.*[A-Z])[a-zA-Z0-9!#$%&*+\-./:;=?@\\^_]{6,16}$/,
            'Password must include at least one number, one uppercase letter and one special character.'
        ),
    [CHANGE_PASSWORD_MODEL.confirmPassword]: yup
        .string()
        .required('Confirm your password')
        .oneOf(
            [yup.ref(CHANGE_PASSWORD_MODEL.newPassword), null],
            'Both passwords must match'
        )
        .required('You must confirm your new password'),
})

export {
    CHANGE_PASSWORD_MODEL,
    changePasswordValidationSchema as validationSchema,
}
