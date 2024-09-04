import { useState, useEffect } from "react"
import { httpAudio } from "../../http-requests/audio"

const useRecorder = () => {
    const [isRecording, setIsRecording] = useState(false)
    const [audioRecord, setAudioRecord] = useState(false)
    const [transcribedRecord, setTranscribedRecord] = useState('')
    const [isTranscribed, setIsTranscribed] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [recorderState, setRecorderState] = useState({
        recordingMinutes : 0, 
        recordingSeconds: 0,
        recordInterval: '',
        initRecording: false,
        mediaStream: null,
        mediaRecorder: null,
        audio: null 
    })

    const startRecording = async () => {
        setIsRecording(true)
        setIsTranscribed(false)
        setTranscribedRecord('')
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
        setRecorderState(() => {
            return {...recorderState, 
                recordingMinutes: 0,
                recordingSeconds: 0,
                initRecording: true,
                mediaStream: stream} 
        })
    }

    const sendAudio = async (file) => {
        setAudioRecord(false)
        setIsRecording(true)
        setTranscribedRecord('')  
        setErrorMessage(false) 
        try {
            const audioFile = new File([recorderState.audio], 'voice.mpeg', {type: 'audio/mpeg'})
            console.log('audio file', audioFile);
            const formData = new FormData()
            formData.append('topic', 'history')
            formData.append('file', file ? file : audioFile)
            setIsTranscribed(true) 
            const { data } = await httpAudio(formData)
            setTranscribedRecord(data.message.answers)
        }
        catch (error){
            setErrorMessage(true)
            setTranscribedRecord('No audio provided! Please try again!')
            console.log(error);
        }
    }

    const saveRecording = () => {
        console.log(recorderState.mediaRecorder);
        const recorder = recorderState.mediaRecorder
        if (recorderState.mediaRecorder) {
        if (!(recorderState.mediaRecorder.state === 'inactive')) {
            recorder.stop() 
        }
    }}

    useEffect(() => {
        if (recorderState.mediaStream) {
            setRecorderState((prevState) => {
                return {
                    ...prevState, 
                    mediaRecorder: new MediaRecorder(recorderState.mediaStream)}
            })
        }
    }, [recorderState.mediaStream])

    useEffect(() => {    
        const recorder = recorderState.mediaRecorder
        let chunks = []
        if (recorder && recorder.state === 'inactive') {
            recorder.start()
            recorder.ondataavailable = (e) => {
                chunks.push(e.data)
            }
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/mpeg' })
                chunks = []
                setRecorderState((prevState) => {
                    return {
                        ...prevState, 
                        initRecording: false,
                        audio: blob}
                });
                setAudioRecord(true)             
            }
        }
        return () => {
            if (recorder) {
                recorder.stream.getAudioTracks().forEach(track => { track.stop() });
            }
        }
    }, [recorderState.mediaRecorder])
  
    useEffect(() => {
        clearInterval(recorderState.recordInterval) 

        if (recorderState.initRecording) {
                clearInterval(recorderState.recordInterval) 
                const newInterval = setInterval(() => {
                setRecorderState(prevState => {
                    if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds<30) {
                        return {
                            ...prevState,
                            recordingSeconds: prevState.recordingSeconds + 1,  
                        }
                    }
                    if (prevState.recordingSeconds = 30) {
                        if (recorderState.mediaRecorder) {
                            if (!(recorderState.mediaRecorder.state === 'inactive')) {
                             recorderState.mediaRecorder.stop();
                             sendAudio()
                            }
                        }
                    }
                    else {
                        clearInterval(newInterval);
                        return {
                            ...prevState,
                            initRecording: false,
                        }                    
                    }
                })

                setRecorderState(prevState => {
                    return {
                        ...prevState,
                        recordInterval: newInterval
                    }
                })
            }, 1000)            
       }        
    }, [recorderState.initRecording])

    useEffect(() => {
        if (audioRecord) {
            console.log('audio saved', audioRecord, recorderState.audio);
            sendAudio()
        }
    })

    return [isRecording, recorderState, startRecording,  saveRecording, transcribedRecord, isTranscribed, sendAudio, setRecorderState, setIsRecording, errorMessage]
}

export default useRecorder