import Divider from "../../../components/Divider"
import {useForm} from "react-hook-form"
import InputCurrency from "../../../components/InputCurrency"

const InputSliderPage = () => {
    const {control} = useForm()

    return <>
        <div className="row">
            <div className="col-11 mt-4">
                <h5>Input currency</h5>
                <Divider/>
                <p>
                    desc
                </p>
            </div>
        </div>

        <div className="row">
            <div className="col-12 mt-5 mb-5">
                <div className="row">
                    <div className="col-6">
                        <InputCurrency
                            name={'test1'}
                            control={control}
                            label={'Currency'}
                            iconPosition={'right'}
                            placeholder={'Placeholder'}
                            prefix={'$ '}
                            suffix={' (USD)'}
                        />
                    </div>
                    <div className="col-6">
                        <InputCurrency
                            name={'test2'}
                            control={control}
                            label={'Currency disabled'}
                            iconPosition={'right'}
                            placeholder={'Placeholder'}
                            prefix={'$ '}
                            suffix={' (USD)'}
                            disabled
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-6">
                        <InputCurrency
                            name={'test1'}
                            control={control}
                            label={'Currency error'}
                            iconPosition={'right'}
                            placeholder={'Placeholder'}
                            prefix={'$ '}
                            suffix={' (USD)'}
                            errors={{message: 'This is an error message'}}
                        />
                    </div>
                    <div className="col-6">
                        <InputCurrency
                            name={'test2'}
                            control={control}
                            label={'Currency success'}
                            iconPosition={'right'}
                            placeholder={'Placeholder'}
                            prefix={'$ '}
                            suffix={' (USD)'}
                            touched
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default InputSliderPage
