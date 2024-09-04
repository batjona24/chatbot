import { createUseStyles } from 'react-jss'
import { RecordIcon, RecordDotIcon, StopRecordIcon, NewRecordIcon, TranscribingIcon, MenuIconMobile, ArrowSelectIcon, CloseIcon} from '../../theme/icons'
import  Button from '../../components/Button'
import useRecorder from './useRecorder'
import { ChatBotLogo, ChatBotUpload } from '../../theme/icons'
import { useState, useEffect } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { NavLink } from 'react-router-dom'
import ChatBotMenu from './ChatBotMenu'
import { Transition } from 'react-transition-group'
import { useRef } from 'react'

const useStyles = createUseStyles((theme) => ({
    '@keyframes slideRight': {
        '0%': { transform: 'translateX(100%)'},
        '100%': { transform: 'translateX(0%)'},
    },
    '@keyframes slideOut': {
        '0%': { transform: 'translateX(0%)'},
        '100%': { transform: 'translateX(100%)'},
    },
    chatBotRoot:{
        width:'100%',
        height: '100%',
        display:'flex',
        flexDirection: 'column'
    },
    chatBotHead:{
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        justifyItems: 'center',
        backgroundColor:theme.palette.background.header,
        height: '320px',
        padding: '24px 56px',
        [theme.mediaQueries.s]:{
            padding: '15px 24px',
            height: '380px'
        },
        [theme.mediaQueries.mChatBot]:{
            height: '350px'
        },
    },
    chatBotTittle:{
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 700,
        color: theme.palette.common.black
    },
    chatBotBody:{ 
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width:'100%',
        maxWidth:'920px',
        top: 212,
        gap: theme.spacing,
        [theme.mediaQueries.s]:{
            paddingLeft: theme.spacing * 2,
            paddingRight: theme.spacing * 2,
            width:'100%',
        },
        [theme.mediaQueries.sChatBot]:{
            maxWidth: '700px',
        },
        [theme.mediaQueries.mChatBot]:{
            top: 170
        },
    },
    popoverchatbot:{ 
        ...theme.utils.flexbox.center,
        flexDirection:'column',
        border: ({isRecording}) => (isRecording ? '2px solid #000000' : '2px solid #CCD4DE'),
        borderRadius: '8px',
        backgroundColor : theme.palette.common.white,
        height:  '360px',
        [theme.mediaQueries.s]:{
            height:'370px',
            border: '2px solid #000000 !important',
        },
    },
    popoverchatbotContainer: {
        ...theme.utils.flexbox.center,
        flexDirection: 'column',
        gap: theme.spacing
    },
    popoverText:{
        fontSize: '18px',
        lineHeight: '24px',
        fontWeight: 400,
        color: '#B2BECA',
        textAlign: 'center',
    },
    strongText:{
        color : theme.palette.common.black
    },
    chatBotLanguage:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '3px',
    },
    language:{
        fontWeight: 400,
        fontSize:'18px',
        color: theme.palette.common.black,
    },
    chatBotUsage:{
        marginTop: '24px'
    },
    chatBotP:{
        fontSize:'18px',
        fontWeight: 700,
        color: theme.palette.common.black
    },
    paragraph:{
        color: theme.palette.common.black,
        lineHeight:'24px'
    },
    subTittle:{
        color:'#8227EE',
        fontSize: '12px',
        paddingLeft: '19px'
    },
    recording: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        gap:'4px'
    },
    stopButton: {
        color: '#B2BECA',
        fontFamily: theme.typography.chatBotFontFamily,
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '48px',
    },
    audioButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing * 4
    },
    nativeSelect:{
        fontFamily : theme.typography.chatBotFontFamily,
        fontSize: '18px',
        fontWeight:700,
        backgroundColor:'none',
        '-webkit-appearance': 'none',
    },
    selectWrapper:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '4px',
    },
    spanRecording:{
        fontFamily: theme.typography.chatBotFontFamily,
        fontSize:'18px'
    },
    recordingBody:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing
    },
    transcribed:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '21px',
    }, 
    trancribedVersion:{
        width: '100%',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: theme.spacing * 2 ,
        paddingRight: theme.spacing * 2,
        [theme.mediaQueries.s]:{
            height: '350px',
        },
    },
    transcribedText:{
        alignSelf: 'flex-start',
        color: ({errorMessage}) => (errorMessage ? 'red' : theme.palette.common.black )
    },
    newRecordButton:{
        alignSelf: 'flex-end'
    },
    menuTransition: {
        animationName: '$slideOut'

    }
}))
const ChatBot = () => { 

    const [isRecording, recorderState, startRecording,  saveRecording, transcribedRecord, isTranscribed, sendAudio, setIsRecording, errorMessage] = useRecorder()
    const { width } = useWindowSize()
    const [isMobile ,setIsMobile] = useState(width <= 540)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        setIsMobile(width <= 540)
    }, [width])


    const getAudio = (e) => {
        const file = e.target.files[0]
        sendAudio(file)
    }
    const handleClick = () => {
        setIsRecording(false)
    }

    const defaultStyle = {
        transition: `opacity 300ms ease-in-out`,
        opacity: 0,
        zIndex: '11',
    }

    const transitionStyles = {
        entering: { opacity: 0},
        entered: { opacity: 1 },
        exiting: { opacity: 0, animationName: '$slideOut' },
        exited: { display: 'none', animationName: '$slideOut'  },
    }
    const nodeRef = useRef(null)
     const classes = useStyles({isRecording, errorMessage, menuOpen})

    return (
    <div className={classes.chatBotRoot}>
        <Transition
            nodeRef={nodeRef}
            in={menuOpen}
            timeout={300}
        >
            {state => (
                <span
                    ref={nodeRef}
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                    }}
                    className={classes.menuTransition}
                >
                    <ChatBotMenu setIsRecording={setIsRecording} setMenuOpen={setMenuOpen}/>
                </span>
            )}
        </Transition>
        <div className={classes.chatBotHead}>
            <ChatBotLogo />
            <p className={classes.chatBotTittle}> {isMobile ? <MenuIconMobile onClick={()=> setMenuOpen(true)}/> : 'Record'}</p>
        </div>
        <div className={classes.chatBotBody}>
            <div className={classes.chatBotLanguage}>
                <p className={classes.language}>Language</p>
                <div className={classes.selectWrapper}>
                    <select className={classes.nativeSelect}>
                        <option value='english'>  English </option>
                        <option value='italian'> Italian </option>
                    </select>
                     <ArrowSelectIcon /> 
                </div>
            </div>
            <div className={classes.popoverchatbot}>
                {!isRecording ? 
                    <div className={classes.popoverchatbotContainer}> 
                        <p className={classes.popoverText}>Record from your 
                        <span className={classes.strongText}> microphone</span>{isMobile ? '' : <> or upload a
                        <span className={classes.strongText}> .wav file</span> </>}</p>
                        <div className={classes.audioButtons}>
                            {isMobile ? <Button variant={'filled'} iconPosition={'left'} icon={<RecordIcon />} size={'medium'} width={'149px'} onClick={startRecording}>Transcribe</Button> : <>
                            <Button variant={'filled'} iconPosition={'left'} icon={<RecordIcon />} size={'medium'} width={'123px'} onClick={startRecording}> 
                            Record</Button>
                            <label>
                                <ChatBotUpload />
                                <input type='file' accept='audio/*' capture style={{display:'none'}} onChange={getAudio} ></input>
                            </label> </> }
                        </div>
                    </div> 
                :  
                    !isTranscribed ?
                        <div className={classes.recordingBody}>
                            <div className={classes.recording}>
                                <RecordDotIcon />
                                <span className={classes.spanRecording}>Recording...</span>
                                <span className={classes.spanRecording}>{recorderState.recordingMinutes}:{recorderState.recordingSeconds < 10 ? <span>0{recorderState.recordingSeconds}</span> : recorderState.recordingSeconds} / 0:30</span>
                            </div>
                            <div>
                                <Button variant={'recording'} iconPosition={'left'} icon={<StopRecordIcon />} width={'50px'} onClick={saveRecording}> 
                                <span className={classes.stopButton}>Stop</span> </Button> 
                            </div>
                        </div>
                    : (
                        transcribedRecord === '' ? 
                            <div className={classes.transcribed}> 
                                <p className={classes.language}> Transcribing record... </p>
                                <TranscribingIcon />
                            </div> 
                        :
                            <div className={classes.trancribedVersion}> 
                                <p className={classes.transcribedText}>{transcribedRecord}</p>
                                <span className={classes.newRecordButton}>{isMobile ? <Button variant={'filled'} iconPosition={'left'} icon={<NewRecordIcon />} width={'208px'} size={'medium'} onClick={handleClick}>New transcription</Button>
                                :<Button variant={'filled'} iconPosition={'left'} icon={<NewRecordIcon />} width={'159px'} size={'medium'} onClick={handleClick}>New Record</Button>}</span>
                            </div>
                    )  
                }
            </div> 
            <div className={classes.chatBotUsage}>
                <p className={classes.chatBotP}> {isMobile ? 'Known limitations' :'How to use'}</p>
                <p className={classes.paragraph}> {isMobile ? '— Lorem ipsum dolor sit amet, consectetur' : 
                '— Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia ex quis nunc cursus fringilla.'}</p>
                <p className={classes.paragraph}> {isMobile ? '— Adipiscing elit. Duis lacinia ex quis nunc ' :
                    '— Aliquam laoreet eros quis nisl dictum, non laoreet libero iaculis. Suspendisse laoreet nibh et nisi ultrices finibus.'}</p>
            </div>
        </div>    
    </div> 
)}
export default ChatBot

