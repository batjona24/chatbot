import { createUseStyles } from 'react-jss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { MailIcon } from '../../../../theme/icons'
import { DevTool } from '@hookform/devtools'
import { httpResetPassword } from '../../../../http-requests'
import { handleApiError } from '../../../../utilities/helpers'
import { FORGOT_PASSWORD_MODEL, validationSchema } from './forgotPasswordModel'

const useStyles = createUseStyles((theme) => ({
    root: {
        display: 'grid',
        gap: theme.spacing * 2,
        width: '100%',
        
    },
}))

const ForgotPasswordForm = ({ submitCallback }) => {
    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, touchedFields },
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        nativeValidation: false,
        defaultValues: {},
        resolver: yupResolver(validationSchema),
    })

    const classes = useStyles()

    const onSubmit = async (values) => {
        try {
            const data = {}
            submitCallback(true)
        } catch (error) {
            handleApiError({
                isReduxError: false,
                error,
                callbackOnFieldError: setError,
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <Input
                type={'email'}
                label={'Email address'}
                placeholder={'Enter your email'}
                touched={touchedFields[FORGOT_PASSWORD_MODEL.email]}
                errors={errors[FORGOT_PASSWORD_MODEL.email]}
                {...register(FORGOT_PASSWORD_MODEL.email)}
                icon={<MailIcon />}
            />
            <Button
                disabled={isSubmitting}
                width={'100%'}
                type={'submit'}
            >
                Send Instructions
            </Button>
            {process.env.NODE_ENV === 'development' && (
                <DevTool control={control} />
            )}
        </form>
    )
}

export default ForgotPasswordForm
