import * as yup from 'yup'

const SIGNUP_MODEL = {
    first_name: 'first_name',
    last_name : "last_name",
    email: 'email',
    password: 'password',
    adult: 'adult_check',
}

const SIGNUP_STATUSES = {
    initial: 'initialStep',
    roleChoice: 'roleChoice',
    categoriesChoice: 'categoriesChoice',
    firstFollowChoice: 'firstFollowChoice',
    completed: 'completed',
}

const signupValidationSchema = yup.object().shape({
    [SIGNUP_MODEL.first_name]: yup
        .string()
        .typeError('Fristname is mandatory')
        .required('Firstname is mandatory'),
    [SIGNUP_MODEL.last_name]: yup
        .string()
        .typeError('Lastname is mandatory')
        .required('Lastname is mandatory'),
    [SIGNUP_MODEL.email]: yup
        .string()
        .email('Email not valid')
        .typeError('Email is mandatory')
        .required('Email is mandatory'),
    [SIGNUP_MODEL.password]: yup
        .string()
        .typeError('Password is mandatory')
        .required('Password is mandatory')
        .min(6, 'Password too short')
        .matches(
            /^(?=.*[0-9])(?=.*[!#$%&*+\-./:;=?@\\^_])(?=.*[A-Z])[a-zA-Z0-9!#$%&*+\-./:;=?@\\^_]{6,16}$/,
            'Password must include at least one number, one uppercase letter and one special character.'
        ),

})

export {
    signupValidationSchema as validationSchema,
    SIGNUP_MODEL,
    SIGNUP_STATUSES,
}
