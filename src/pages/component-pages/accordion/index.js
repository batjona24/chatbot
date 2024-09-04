import React from 'react'
import Divider from "../../../components/Divider";
import Accordion from "../../../components/Accordion";
import {SettingsIcon} from "../../../theme/icons"

const AccordionPage = () => {
    return <>
        <div className="row">
            <div className="col-12 mt-4">
                <h5>Accordion</h5>
                <Divider/>
                <p> desc
                </p>
            </div>
        </div>

        <div className="row my-5">
            <div className="col-12">
                <Accordion
                    title={"Accordion not animated"}
                    icon={<SettingsIcon fill="#000"/>}
                    animated={false}
                >
                    <p> The HOC based API is deprecated as of v10 and may be removed in a future version. You can still
                        perform a lazy migration as described here. HOC specific docs are available here. </p>
                </Accordion>
            </div>
        </div>
        <div className="row mb-5">
            <div className="col-6">
                <Accordion
                    title={"Accordion sample"}
                    icon={<SettingsIcon fill="#000"/>}
                >
                    <p> The HOC based API is deprecated as of v10 and may be removed in a future version. You can still
                        perform a lazy migration as described here. HOC specific docs are available here. </p>
                </Accordion>
            </div>
            <div className="col-6">
                <Accordion
                    title={"Accordion sample default open"}
                    icon={<SettingsIcon fill="#000"/>}
                    defaultOpen
                >
                    <p> The HOC based API is deprecated as of v10 and may be removed in a future version. You can still
                        perform a lazy migration as described here. HOC specific docs are available here. </p>
                </Accordion>
            </div>
        </div>
    </>
}

export default AccordionPage
