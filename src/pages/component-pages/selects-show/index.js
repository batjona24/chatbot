import {createUseStyles} from 'react-jss'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {retrieveSelectMultiValues} from "../../../utilities/helpers";
import Select from "../../../components/Select";
import React from "react";
import Divider from "../../../components/Divider";

const useStyles = createUseStyles((theme) => ({
    root: {}
}))

const TEST_MODEL = {
    test1: 'test1',
    test2: 'test2',
    test3: 'test3'
}

const validationSchema = yup.object().shape({
    [TEST_MODEL.test1]: yup.object().nullable().required('Choose an item'),
    [TEST_MODEL.test2]: yup.array().min(1, 'Choose at least one item'),
    [TEST_MODEL.test3]: yup.array().min(1, 'Choose at least one item')
})

const testOptions = [
    {label:"One", value:1},
    {label:"Two", value:2},
    {label:"Three", value:3}
]

const SelectsShow = () => {
    const {control} = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        nativeValidation: false,
        defaultValues: {
            [TEST_MODEL.test3]: retrieveSelectMultiValues(testOptions, [1, 2])
        },
        resolver: yupResolver(validationSchema)
    })
    const classes = useStyles()

    return <>
        <div className="row">
            <div className="col-12 mt-4">
                <h5>Selects</h5>
                <Divider/>
                <p>
                    desc
                </p>
            </div>
        </div>

        <form className={classes.root} onSubmit={(values) => console.log(values)}>
            <div className="row mt-4">
                <div className="col-4">
                    <Select
                        name={TEST_MODEL.test1}
                        control={control}
                        label={"Normal select"}
                        isClearable
                        placeholder={'Placeholder'}
                        options={testOptions}
                    />
                </div>
                <div className="col-4">
                    <Select
                        name={TEST_MODEL.test2}
                        control={control}
                        label={"Creatable select"}
                        isMulti
                        placeholder={'Choose a at least one item...'}
                        options={testOptions}
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
                        name={TEST_MODEL.test3}
                        options={testOptions}
                    />
                </div>
            </div>
        </form>
    </>
}

export default SelectsShow
