import React from 'react'
import Divider from "../../../components/Divider";
import Radio from "../../../components/Radio"

const Radios = () => {

    return <>
        <div className="row">
            <div className="col-12 mt-4">
                <h5>Radio</h5>
                <Divider/>
                <p> desc
                </p>
            </div>
        </div>

        <div className="row mt-4">
            <div className='col-2'>
                <Radio name={'test'} label={'Left label'}/>
            </div>
            <div className='col-2'>
                <Radio name={'test'} label={'Checked'} labelPosition={'right'} inputProps={{defaultChecked: true}}/>
            </div>
            <div className='col-2'>
                <Radio name={'test'} label={'radio with error'} labelPosition={'right'} error={{message: 'Error message sample'}}/>
            </div>
            <div className='col-3'>
                <Radio label={'disabled label'} labelPosition={'right'} disabled/>
            </div>
            <div className='col-3'>
                <Radio label={'checked label small '} labelPosition={'right'} isSmall inputProps={{defaultChecked: true}}/>
            </div>
        </div>
    </>
}

export default Radios
