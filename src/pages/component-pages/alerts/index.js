import React from 'react'
import Alert from "../../../components/Alert";
import Divider from "../../../components/Divider";
import Banner from "../../../components/Banner";
import Dot from "../../../components/Dot";
import Accordion from "../../../components/Accordion";

const Alerts = () => {
    return <>
        <div className="row">
            <div className="col-12 mt-4">
                <h5>Checkboxes</h5>
                <Divider/>
                <p> desc
                </p>
            </div>
        </div>

        <div className="row mt-5 mb-5">
            <div className="col-6">
                <Alert visible={true} title={"title of the alert"}
                       message={"text message of this alert not so long"}
                       variant={"fail"} canDismiss={false}/>
                <Alert visible={true} title={"title of the alert"}
                       message={"text message of this alert not so long"}
                       variant={"pending"} canDismiss={false}/>
                <Alert visible={true} title={"title of the alert"}
                       message={"text message of this alert not so long"}
                       variant={"success"} canDismiss={false}/>
            </div>
            <div className="col-6">
                <Alert visible={true} title={"title of the alert"}
                       message={"text message of this alert not so long"}
                       variant={"fail"} withLeftIcon={true}/>
                <Alert visible={true} title={"title of the alert"}
                       message={"text message of this alert not so long"}
                       variant={"pending"} withLeftIcon={true}/>
                <Alert visible={true} title={"title of the alert"}
                       message={"text message of this alert not so long"}
                       variant={"success"} withLeftIcon={true}/>
            </div>
        </div>
    </>
}

export default Alerts
