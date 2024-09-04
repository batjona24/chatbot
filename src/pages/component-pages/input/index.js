import React, {useState} from 'react'
import Input from "../../../components/Input"
import {EyeOpenIcon, HideIcon, LockIcon, TwitchIcon} from "../../../theme/icons"
import Divider from "../../../components/Divider"

const Inputs = () => {
    //statuses
    const [showPassword, setShowPassword] = useState(false)

    return <>
        <div className="row">
            <div className="col-11 mt-4">
                <h5>Input</h5>
                <Divider/>
                <p>
                    Gli Input sono componenti creati per funzionare appositamente con reacthookform 7 oppure sganciati.
                    Hanno molteplici stilie props cosi da adattarsi ad ogni stato. Nel
                    file <code> Input.js </code> nella cartella components possiamo modificarne stile e comportamento
                    per adattarlo al progetto.
                    Nel caso i cambiamenti da effettuare siano di minor impatto tramite le props ci garantiamo un'ottima
                    manipolazione del componente.
                </p>
            </div>
        </div>

        <div className="row">
            <div className="col-12 mt-5 mb-5">
                <div className="row mb-3">
                    <div className="col-4">
                        <Input type={"text"} name={"input"} label={"Input label"} placeholder={"placeholder"}
                               icon={<TwitchIcon/>} helpText={"helpText sample here"}/>
                    </div>
                    <div className="col-4">
                        <Input type={"text"} name={"input"} label={"Input label"} placeholder={"placeholder"}
                               iconPosition={"right"}/>
                    </div>
                    <div className="col-4">
                        <Input type={"text"} name={"input"} label={"Input label"} placeholder={"placeholder"}
                               icon={<TwitchIcon/>} iconPosition={"right"}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4">
                        <Input type={showPassword ? 'text' : 'password'} label={"Password"}
                               placeholder={'Enter your password'} icon={<LockIcon/>}
                               statusIcon={showPassword ? <EyeOpenIcon/> : <HideIcon/>}
                               statusIconCallback={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    <div className="col-4">
                        <Input type={"text"} name={"input"} label={"Input label"} placeholder={"placeholder"}
                               iconPosition={"right"} errors={{message: "this is a sample error message"}}/>
                    </div>
                    <div className="col-4">
                        <Input type={"text"} name={"input"} label={"Input label"} placeholder={"placeholder"}
                               iconPosition={"right"} touched={true}/>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Inputs
