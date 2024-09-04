import React from 'react'
import Divider from "../../../components/Divider";
import Chip from "../../../components/Chip"
import {ChatIcon} from "../../../theme/icons"

const Chips = () => {

    return <>
        <div className="row">
            <div className="col-12 mt-4">
                <h5>Chips</h5>
                <Divider/>
                <p>
                    Il componente Chip ha molteplici stili e props così da adattarsi ad ogni stato.
                    Nel file <code> Chip.js </code> nella cartella components possiamo modificarne stile e comportamento
                    per adattarlo al progetto. Nel caso i cambiamenti da effettuare siano di minor impatto tramite
                    le props ci garantiamo un'ottima manipolazione del componente.
                </p>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-2">
                <Chip text={'Small filled'} size={'small'}/>
            </div>
            <div className="col-2">
                <Chip text={'Small outlined'} outlined textColor={'primary'} size={'small'}/>
            </div>
            <div className="col-2">
                <Chip text={'Small rounded'} rounded size={'small'}/>
            </div>
            <div className="col-2">
                <Chip text={'Small outlined rounded'} rounded outlined textColor={'primary'} size={'small'} />
            </div>
            <div className="col-2">
                <Chip text={'Small text only'} textOnly textColor={'primary'} size={'small'}/>
            </div>
            <div className="col-2">
                <Chip icon={<ChatIcon/>} size={'small'}/>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-2">
                <Chip text={'Small filled left icon'} size={'small'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip text={'Small outlined left icon'} outlined textColor={'primary'} size={'small'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip text={'Small rounded left icon'} rounded size={'small'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip text={'Small outlined rounded left icon'} rounded outlined textColor={'primary'} size={'small'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip text={'Small text only left icon'} textOnly textColor={'primary'} size={'small'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip icon={<ChatIcon/>} size={'small'} isPathFilledIcon outlined textColor={'primary'}/>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-2">
                <Chip text={'Small filled right icon'} size={'small'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip text={'Small outlined right icon'} outlined textColor={'primary'} size={'small'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip text={'Small rounded right icon'} rounded size={'small'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip text={'Small outlined rounded right icon'} rounded outlined textColor={'primary'} size={'small'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip text={'Small text only right icon'} textOnly textColor={'primary'} size={'small'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip icon={<ChatIcon/>} size={'small'} isPathFilledIcon outlined textColor={'primary'} textOnly/>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-2">
                <Chip color={'secondary'} text={'Medium filled'} size={'medium'}/>
            </div>
            <div className="col-2">
                <Chip text={'Medium outlined'} outlined textColor={'secondary'} size={'medium'}/>
            </div>
            <div className="col-2">
                <Chip color={'secondary'} text={'Medium rounded'} rounded size={'medium'}/>
            </div>
            <div className="col-2">
                <Chip text={'Medium outlined rounded'} rounded outlined textColor={'secondary'} size={'medium'} />
            </div>
            <div className="col-2">
                <Chip text={'Medium text only'} textOnly textColor={'secondary'} size={'medium'}/>
            </div>
            <div className="col-2">
                <Chip color={'secondary'} icon={<ChatIcon/>} size={'medium'}/>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-2">
                <Chip color={'secondary'} text={'Medium filled left icon'} size={'medium'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip text={'Medium outlined left icon'} outlined textColor={'secondary'} size={'medium'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip color={'secondary'} text={'Medium rounded left icon'} rounded size={'medium'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip text={'Medium outlined rounded left icon'} rounded outlined textColor={'secondary'} size={'medium'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip text={'Medium text only left icon'} textOnly textColor={'secondary'} size={'medium'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip icon={<ChatIcon/>} size={'medium'} isPathFilledIcon outlined textColor={'secondary'}/>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-2">
                <Chip color={'secondary'} text={'Medium filled right icon'} size={'medium'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip text={'Medium outlined right icon'} outlined textColor={'secondary'} size={'medium'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip color={'secondary'} text={'Medium rounded right icon'} rounded size={'medium'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip text={'Medium outlined rounded right icon'} rounded outlined textColor={'secondary'} size={'medium'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip text={'Medium text only right icon'} textOnly textColor={'secondary'} size={'medium'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip icon={<ChatIcon/>} size={'medium'} isPathFilledIcon outlined textColor={'secondary'} textOnly/>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-2">
                <Chip color={'tertiary'} text={'Big filled'} size={'big'}/>
            </div>
            <div className="col-2">
                <Chip text={'Big outlined'} outlined textColor={'tertiary'} size={'big'}/>
            </div>
            <div className="col-2">
                <Chip color={'tertiary'} text={'Big rounded'} rounded size={'big'}/>
            </div>
            <div className="col-2">
                <Chip text={'Big outlined rounded'} rounded outlined textColor={'tertiary'} size={'big'} />
            </div>
            <div className="col-2">
                <Chip text={'Big text only'} textOnly textColor={'tertiary'} size={'big'}/>
            </div>
            <div className="col-2">
                <Chip color={'tertiary'} icon={<ChatIcon/>} size={'big'}/>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-2">
                <Chip color={'tertiary'} text={'Big filled left icon'} size={'big'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip text={'Big outlined left icon'} outlined textColor={'tertiary'} size={'big'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip color={'tertiary'} text={'Big rounded right icon'} rounded size={'big'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip text={'Big outlined rounded left icon'} rounded outlined textColor={'tertiary'} size={'big'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip text={'Big text only left icon'} textOnly textColor={'tertiary'} size={'big'} icon={<ChatIcon/>} isPathFilledIcon/>
            </div>
            <div className="col-2">
                <Chip icon={<ChatIcon/>} size={'big'} isPathFilledIcon outlined textColor={'tertiary'}/>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-2">
                <Chip color={'tertiary'} text={'Big filled right icon'} size={'big'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip text={'Big outlined right icon'} outlined textColor={'tertiary'} size={'big'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip color={'tertiary'} text={'Big rounded right icon'} rounded size={'big'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip text={'Big outlined rounded right icon'} rounded outlined textColor={'tertiary'} size={'big'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip text={'Big text only right icon'} textOnly textColor={'tertiary'} size={'big'} icon={<ChatIcon/>} isPathFilledIcon iconPosition={'right'}/>
            </div>
            <div className="col-2">
                <Chip icon={<ChatIcon/>} size={'big'} isPathFilledIcon outlined textColor={'tertiary'} textOnly/>
            </div>
        </div>
    </>
}

export default Chips
