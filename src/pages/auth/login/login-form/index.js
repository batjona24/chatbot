import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import {
    EyeOpenIcon,
    HideIcon,
    LockIcon,
    MailIcon,
} from '../../../../theme/icons'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { login } from '../../../../store/slices/user'
import { handleApiError } from '../../../../utilities/helpers'
import { unwrapResult } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import {routeNames} from '../../../../utilities/constants'
import { LOGIN_MODEL, validationSchema } from './loginModel'

const useStyles = createUseStyles((theme) => ({
    root: {
        display: 'grid',
        gap: theme.spacing * 2,
        width: '100%'
    },
}))

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, touchedFields },
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        nativeValidation: false,
        defaultValues: {},
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = async (values) => {
        try {
            const { data } = await dispatch(login(values))
            navigate(routeNames.ROOT_CHATBOT)
            console.log('done');
        } catch (error) {
            handleApiError({
                error,
                callbackOnFieldError: setError,
            })
            console.log(error);
        }
    }

    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <Input
                type={'email'}
                label={'Email address'}
                placeholder={'Enter your email'}
                touched={touchedFields[LOGIN_MODEL.email]}
                errors={errors[LOGIN_MODEL.email]}
                {...register(LOGIN_MODEL.email)}
                icon={<MailIcon />}
            />
            <Input
                type={showPassword ? 'text' : 'password'}
                label={'Password'}
                placeholder={'Enter your password'}
                touched={touchedFields[LOGIN_MODEL.password]}
                errors={errors[LOGIN_MODEL.password]}
                {...register(LOGIN_MODEL.password)}
                icon={<LockIcon />}
                statusIcon={showPassword ? <EyeOpenIcon /> : <HideIcon />} // TODO: find new icon "EyeOpenIcon"
                statusIconCallback={() => setShowPassword(!showPassword)}
            />
            <Button type={'submit'} width={'100%'}>
                Login
            </Button>
        </form>
    )
}

export default LoginForm
