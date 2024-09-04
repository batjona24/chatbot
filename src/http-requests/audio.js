import axios from '../utilities/axios'

export const httpAudio= (data) => {
    const url = 'http://localhost:80/api/transcript'
    return axios.post(url, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}