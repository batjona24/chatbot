import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DevTool } from '@hookform/devtools'
import Input from '../../../../components/Input'
import { EyeOpenIcon, HideIcon, LockIcon } from '../../../../theme/icons'
import Button from '../../../../components/Button'
import { handleApiError } from '../../../../utilities/helpers'
import { RESET_PASSWORD_MODEL, validationSchema } from './resetPasswordModel'

const useStyles = createUseStyles((theme) => ({
    root: {
        display: 'grid',
        gap: 16,
    },
}))

const ResetPasswordForm = ({ invalidToken, email, token, submitCallback }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {
        control,
        register,
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

    const onSubmit = async (values) => {
        try {
            const data = {}
            submitCallback()
        } catch (error) {
            handleApiError({
                error: error,
                callbackOnFieldError: setError,
            })
        }
    }

    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <Input
                type={showPassword ? 'text' : 'password'}
                label={'New Password'}
                placeholder={'Enter new Password'}
                touched={touchedFields[RESET_PASSWORD_MODEL.password]}
                errors={errors[RESET_PASSWORD_MODEL.password]}
                {...register(RESET_PASSWORD_MODEL.password)}
                icon={<LockIcon />}
                helpText={'Must be at least 8 characters'}
                statusIcon={showPassword ? <EyeOpenIcon /> : <HideIcon />} // TODO: find new icon "EyeOpenIcon"
                statusIconCallback={() => setShowPassword(!showPassword)}
                inputProps={{ disabled: invalidToken }}
            />
            <Input
                type={showConfirmPassword ? 'text' : 'password'}
                label={'Confirm Password'}
                placeholder={'Enter new Password'}
                touched={touchedFields[RESET_PASSWORD_MODEL.confirmPassword]}
                errors={errors[RESET_PASSWORD_MODEL.confirmPassword]}
                {...register(RESET_PASSWORD_MODEL.confirmPassword)}
                icon={<LockIcon />}
                helpText={
                    !errors?.confirm_password && 'Both passwords must match'
                }
                statusIcon={
                    showConfirmPassword ? <EyeOpenIcon /> : <HideIcon />
                } // TODO: find new icon "EyeOpenIcon"
                statusIconCallback={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                }
                inputProps={{ disabled: invalidToken }}
            />
            <Button
                disabled={isSubmitting || invalidToken}
                width={'100%'}
                type={'submit'}
                variant={'filled'}
            >
                Reset Password
            </Button>
            {process.env.NODE_ENV === 'development' && (
                <DevTool control={control} />
            )}
        </form>
    )
}

export default ResetPasswordForm
