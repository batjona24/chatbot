import {createUseStyles} from 'react-jss'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {components} from 'react-select'
import * as yup from 'yup'
import {retrieveSelectSingleValue} from "../../../utilities/helpers";
import Select from "../../../components/Select";
import {CloseIcon} from "../../../theme/icons";
import React from "react";

const useStyles = createUseStyles((theme) => ({
    root: {}
}))

const TEST_MODEL = {
    test: 'test'
}

const validationSchema =yup.object().shape({
    [TEST_MODEL.test]: yup
        .array(
            yup.object({
                value: yup.number(),
                label: yup.string(),
            })
        )
        .compact()
        .min(1, 'Choose at least one item'),
})

const testOptions = [
    {label:"One", value:1},
    {label:"Two", value:2},
    {label:"Three", value:3}
]

const SelectsShow = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        setError,
        reset,
        formState: {errors},
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        nativeValidation: false,
        defaultValues: {
            [TEST_MODEL.test]: [ retrieveSelectSingleValue(
                testOptions,
                1
            )],
        },
        resolver: yupResolver(validationSchema),
    })
    const classes = useStyles()

    console.log(control)

    return (
        <form className={classes.root} onSubmit={(values) => console.log(values)}>
            <div className="row mb-3">
                <div className="col-4">
                    <Select
                        label={"Normal select"}
                        isSearchable
                        isMulti
                        control={control}
                        placeholder={'Choose a at least one item...'}
                        name={TEST_MODEL.test}
                        options={testOptions}
                        errors={errors[TEST_MODEL.test]}
                        components={{MultiValueRemove}}
                        multiValueCustomStyle={multiValueCustomStyle}
                        multiValueLabelCustomStyle={multiValueLabelCustomStyle}
                    />
                </div>
                <div className="col-4">
                    <Select
                        label={"Creatable select"}
                        isSearchable
                        isMulti
                        isCreatable
                        control={control}
                        placeholder={'Choose a at least one item...'}
                        name={TEST_MODEL.test}
                        options={testOptions}
                        errors={errors[TEST_MODEL.test]}
                        components={{MultiValueRemove}}
                        multiValueCustomStyle={multiValueCustomStyle}
                        multiValueLabelCustomStyle={multiValueLabelCustomStyle}
                    />
                </div>
                <div className="col-4">
                    <Select
                        label={"Clearable select"}
                        isSearchable
                        isMulti
                        isCreatable
                        isClearable
                        control={control}
                        placeholder={'Choose a at least one item...'}
                        name={TEST_MODEL.test}
                        options={testOptions}
                        errors={errors[TEST_MODEL.test]}
                        components={{MultiValueRemove}}
                        multiValueCustomStyle={multiValueCustomStyle}
                        multiValueLabelCustomStyle={multiValueLabelCustomStyle}
                    />
                </div>
            </div>
        </form>
    )
}

const multiValueCustomStyle = {
    padding: '10px 4px',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(121, 65, 117, 0.05)',
}

const multiValueLabelCustomStyle = {
    color: '#6B2D66',
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 0.5,
}

const MultiValueRemove = (props) => {
    return (
        <components.MultiValueRemove {...props}>
            <CloseIcon width={20} height={20} stroke={'#6B2D66'}/>
        </components.MultiValueRemove>
    )
}

export default SelectsShow
