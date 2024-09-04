import React from 'react'
import ToggleSwitch from "../../../components/ToggleSwitch";
import Divider from "../../../components/Divider";

const TogglePage = () => {

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
            <div className="col-3">
                <ToggleSwitch label={"Toggle check label"} labelOn={"right"}/>
            </div>
            <div className="col-3">
                <ToggleSwitch label={"Toggle check label"} labelOn={"right"} defaultChecked={true}/>
            </div>
            <div className="col-3">
                <ToggleSwitch label={"Toggle check label"} labelOn={"right"}
                              errors={{message: "This is an error"}}/>
            </div>
            <div className="col-3">
                <ToggleSwitch label={"Toggle check label"} labelOn={"right"} isSmall={true}/>
            </div>
        </div>
    </>
}

export default TogglePage
