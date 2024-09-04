import Divider from "../../../components/Divider"
import InputSlider from "../../../components/InputSlider"
import {useForm} from "react-hook-form"

const InputSliderPage = () => {
    const {control} = useForm()

    return <>
        <div className="row">
            <div className="col-11 mt-4">
                <h5>Input slider</h5>
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
                        <InputSlider
                            name={'test1'}
                            control={control}
                            label={'Slider'}
                            defaultValue={30}
                            marksNumber={6}
                            minValue={5}
                            maxValue={100}
                            step={1}
                            prefix={'$ '}
                        />
                    </div>
                    <div className="col-5 offset-1">
                        <InputSlider
                            name={'test2'}
                            control={control}
                            disabled
                            label={'Slider disabled'}
                            marksNumber={11}
                            suffix={' K'}
                        />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-6">
                        <InputSlider
                            name={'test3'}
                            control={control}
                            isSmall
                            color={'tertiary'}
                            label={'Small slider'}
                            marksNumber={5}
                        />
                    </div>
                    <div className="col-5 offset-1">
                        <InputSlider
                            name={'test4'}
                            control={control}
                            isSmall
                            disabled
                            label={'Small slider disabled'}
                            marksNumber={2}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default InputSliderPage
