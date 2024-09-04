import * as yup from 'yup'

const FORGOT_PASSWORD_MODEL = {
    email: 'email',
}

const forgotPasswordValidationSchema = yup.object().shape({
    [FORGOT_PASSWORD_MODEL.email]: yup
        .string()
        .email('Email not valid')
        .required('Email is mandatory'),
})

export {
    FORGOT_PASSWORD_MODEL,
    forgotPasswordValidationSchema as validationSchema,
}
