import React from 'react'
import Checkbox from "../../../components/Checkbox";
import Divider from "../../../components/Divider";

const Checkboxes = () => {

    return <>
        <div className="row">
            <div className="col-12 mt-4">
                <h5>Checkboxes</h5>
                <Divider/>
                <p> desc
                </p>
            </div>
        </div>

        <div className="row mt-4">
            <div className='col-2'>
                <Checkbox label={'Left label'}/>
            </div>
            <div className='col-2'>
                <Checkbox label={'Checked'} labelPosition={'right'} inputProps={{defaultChecked: true}}/>
            </div>
            <div className='col-2'>
                <Checkbox label={'checkbox with error'} labelPosition={'right'} error={{message: 'Error message sample'}}/>
            </div>
            <div className='col-3'>
                <Checkbox label={'disabled label'} labelPosition={'right'} disabled/>
            </div>
            <div className='col-3'>
                <Checkbox label={'checked label small'} labelPosition={'right'} isSmall inputProps={{defaultChecked: true}}/>
            </div>
        </div>
    </>
}

export default Checkboxes
