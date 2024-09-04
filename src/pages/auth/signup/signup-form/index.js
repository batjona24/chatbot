import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    selectSignupStatus,
} from '../../../../store/slices/user'
import { handleApiError } from '../../../../utilities/helpers'
import {validationSchema } from './signupModel.js'
import { unwrapResult } from '@reduxjs/toolkit'
import { createUseStyles } from 'react-jss'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import {
    EyeOpenIcon,
    HideIcon,
    LockIcon,
    MailIcon,
    UserIcon
} from '../../../../theme/icons'
import { useNavigate } from 'react-router-dom'
import {routeNames} from '../../../../utilities/constants'
import { SIGNUP_MODEL } from './signupModel'
import { httpSignupUser } from '../../../../http-requests'

const useStyles = createUseStyles((theme) => ({
    root: {
        display: 'grid',
        gap: theme.spacing * 2,
        width: '100%'
    },
}))



const SignupForm = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const step = useSelector(selectSignupStatus)
    const [showPassword, setShowPassword] = useState(false)
    
    const [signupData, setSignupData] = useState({})

    const formMethods = useForm({
        shouldUnregister: true,
        mode: 'onBlur',
        reValidateMode: 'onChange',
        nativeValidation: false,
        defaultValues: {},
        resolver: yupResolver(validationSchema),
    })
    const { handleSubmit, setError, register, formState: { errors, touchedFields }} = formMethods

    const onSignUp = async (values) => {
        const dataToSend = {
            ...signupData,
            ...values,
        }
        try {
            console.log(dataToSend);
            const { data } = await httpSignupUser(dataToSend)
            //unwrapResult(data)
            //navigate(routeNames.ACTIVATION)
            navigate(routeNames.LOGIN)
        } catch (error) {
            console.log(error);
            handleApiError({
                error,
                callbackOnFieldError: setError,
            })
        }
    }

    const classes = useStyles()

    return (
        <FormProvider {...formMethods}>          
            <form onSubmit={handleSubmit(onSignUp)} className={classes.root}>
                <Input
                    type={'text'}
                    label={'Firstname'}
                    placeholder={'Enter your firstname'}
                    touched={touchedFields[SIGNUP_MODEL.first_name]}
                    errors={errors[SIGNUP_MODEL.first_name]}
                    {...register(SIGNUP_MODEL.first_name)}
                    icon={<UserIcon />}
                />
                 <Input
                    type={'text'}
                    label={'Lastname'}
                    placeholder={'Enter your lastname'}
                    touched={touchedFields[SIGNUP_MODEL.last_name]}
                    errors={errors[SIGNUP_MODEL.last_name]}
                    {...register(SIGNUP_MODEL.last_name)}
                    icon={<UserIcon />}
                />
                <Input
                    type={'email'}
                    label={'Email address'}
                    placeholder={'Enter your email'}
                    touched={touchedFields[SIGNUP_MODEL.email]}
                    errors={errors[SIGNUP_MODEL.email]}
                    {...register(SIGNUP_MODEL.email)}
                    icon={<MailIcon />}
                />
                <Input
                    type={showPassword ? 'text' : 'password'}
                    label={'Password'}
                    placeholder={'Enter your password'}
                    touched={touchedFields[SIGNUP_MODEL.password]}
                    errors={errors[SIGNUP_MODEL.password]}
                    {...register(SIGNUP_MODEL.password)}
                    icon={<LockIcon />}
                    statusIcon={showPassword ? <EyeOpenIcon /> : <HideIcon />} // TODO: find new icon "EyeOpenIcon"
                    statusIconCallback={() => setShowPassword(!showPassword)}
                />
                <Button type={'submit'} width={'100%'}>
                    Signup
                </Button>
            </form>
        </FormProvider>
    )
}

export default SignupForm


