import { createUseStyles } from 'react-jss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EyeOpenIcon, HideIcon, LockIcon } from '../../../../theme/icons'
import Input from '../../../../components/Input'
import { useState } from 'react'
import { CHANGE_PASSWORD_MODEL, validationSchema } from './changePasswordModel'
import Button from '../../../../components/Button'
import { handleApiError } from '../../../../utilities/helpers'
import { useDispatch } from 'react-redux'
import { setAlertMessage } from '../../../../store/slices/app'
import {app} from '../../../../utilities/constants'
import Divider from '../../../../components/Divider'

const useStyles = createUseStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gap: 16,
        alignItems: 'end',
    },
    fields: {
        display: 'grid',
        gap: 16,
    },
}))

const ChangePasswordForm = () => {
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { touchedFields, errors, isSubmitting },
    } = useForm({
        shouldUnregister: true,
        mode: 'onBlur',
        reValidateMode: 'onChange',
        nativeValidation: false,
        defaultValues: {},
        resolver: yupResolver(validationSchema),
    })
    const currentPasswordFilled = watch(CHANGE_PASSWORD_MODEL.currentPassword)

    const onSubmitHandler = async (values) => {
        try {
            const data = {}
            dispatch(
                setAlertMessage({
                    message: 'Password changed successfully!',
                    variant: app.SUCCESS,
                })
            )
        } catch (error) {
            handleApiError({
                isReduxError: false,
                error,
                callbackOnFieldError: setError,
            })
        }
    }

    const classes = useStyles()

    return (
        <form className={classes.root} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={classes.fields}>
                <Input
                    iconPosition={null}
                    type={'text'}
                    label={'Old Password'}
                    helpText={
                        'In order to change the password you must enter the current one'
                    }
                    placeholder={'Enter your old Password'}
                    touched={
                        touchedFields[CHANGE_PASSWORD_MODEL.currentPassword]
                    }
                    errors={errors[CHANGE_PASSWORD_MODEL.currentPassword]}
                    {...register(CHANGE_PASSWORD_MODEL.currentPassword)}
                />
                <Divider />
                <Input
                    type={showNewPassword ? 'text' : 'password'}
                    label={'New Password'}
                    placeholder={'Enter new Password'}
                    touched={touchedFields[CHANGE_PASSWORD_MODEL.newPassword]}
                    errors={errors[CHANGE_PASSWORD_MODEL.newPassword]}
                    {...register(CHANGE_PASSWORD_MODEL.newPassword)}
                    icon={<LockIcon />}
                    statusIcon={
                        showNewPassword ? <EyeOpenIcon /> : <HideIcon />
                    }
                    statusIconCallback={() =>
                        setShowNewPassword(!showNewPassword)
                    }
                    disabled={!currentPasswordFilled}
                />
                <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    label={'Confirm Password'}
                    placeholder={'Confirm new Password'}
                    touched={
                        touchedFields[CHANGE_PASSWORD_MODEL.confirmPassword]
                    }
                    errors={errors[CHANGE_PASSWORD_MODEL.confirmPassword]}
                    {...register(CHANGE_PASSWORD_MODEL.confirmPassword)}
                    icon={<LockIcon />}
                    statusIcon={
                        showConfirmPassword ? <EyeOpenIcon /> : <HideIcon />
                    }
                    statusIconCallback={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                    }
                    disabled={!currentPasswordFilled}
                />
            </div>
            <Button
                disabled={isSubmitting || !currentPasswordFilled}
                width={'100%'}
                type={'submit'}
                variant={'primary'}
            >
                Change password
            </Button>
            {/*{process.env.NODE_ENV === 'development' && (
                <DevTool control={control} />
            )}*/}
        </form>
    )
}

export default ChangePasswordForm
