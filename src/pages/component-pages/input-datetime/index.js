import Divider from "../../../components/Divider"
import {useForm} from "react-hook-form"
import InputDateTime from "../../../components/InputDateTime"
import {CalendarIcon, ClockIcon} from "../../../theme/icons"

const InputDatetimePage = () => {
    const {control, watch} = useForm()
    console.log(watch("date4"))
    return <>
        <div className="row">
            <div className="col-11 mt-4">
                <h5>Input datetime</h5>
                <Divider/>
                <p>
                    desc
                </p>
            </div>
        </div>

        <div className="row">
            <div className="col-12 my-5">
                <div className="row">
                    <div className="col-4">
                        <InputDateTime
                            control={control}
                            name="date1"
                            label="Input datetime"
                            icon={<CalendarIcon fill={"#000"}/>}
                            helpText="Help text sample"
                            placeholder="Select a date"
                            locale={"it"}
                        />
                    </div>
                    <div className="col-4">
                        <InputDateTime
                            control={control}
                            name="date2"
                            label="Input date"
                            icon={<CalendarIcon fill={"#000"}/>}
                            helpText="Help text sample"
                            placeholder="Select a date"
                            showTimeSelect={false}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div className="col-4">
                        <InputDateTime
                            control={control}
                            name="date3"
                            label="Input time"
                            icon={<ClockIcon fill={"#000"}/>}
                            helpText="Help text sample"
                            placeholder="Select a date"
                            showTimeSelectOnly
                            dateFormat="hh:mm a"
                        />
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-4">
                        <InputDateTime
                            control={control}
                            name="date4"
                            label="Input date range"
                            icon={<CalendarIcon fill={"#000"}/>}
                            helpText="Help text sample"
                            placeholder="Select a date"
                            dateFormat={"yyyy-MM-dd"}
                            isRange
                            defaultValue={new Date()}
                        />
                    </div>
                    <div className="col-4">
                        <InputDateTime
                            control={control}
                            name="date5"
                            label="Input datetime"
                            icon={<CalendarIcon fill={"#000"}/>}
                            placeholder="Select a date"
                            locale={"it"}
                            touched
                            defaultValue={new Date()}
                            isClearable={false}
                            minDate={new Date()}
                        />
                    </div>
                    <div className="col-4">
                        <InputDateTime
                            control={control}
                            name="date6"
                            label="Input datetime"
                            icon={<CalendarIcon fill={"#000"}/>}
                            placeholder="Select a date"
                            locale={"it"}
                            errors={{message: "Error message sample"}}
                            isClearable={false}
                        />
                    </div>
                </div>

                {/*<div className="row">
                    <div className="col-4">
                        <InputDateTime
                            control={control}
                            name="date4"
                            label="Input date"
                            icon={<CalendarIcon fill={"#000"}/>}
                            helpText="Help text sample"
                            placeholder="Select a date"
                            isRange
                            defaultValue={[
                                new Date("Sun Jun 05 2022 14:40:51 GMT+0200 (Central European Summer Time)"),
                                new Date("Fri Jul 01 2022 14:40:51 GMT+0200 (Central European Summer Time)")
                            ]}
                        />
                    </div>
                </div>*/}
            </div>
        </div>
    </>
}

export default InputDatetimePage
