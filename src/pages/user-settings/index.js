import { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { useWindowSize } from '../../hooks/useWindowSize'
import Back from '../../components/Back'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const useStyles = createUseStyles((theme) => ({
    root: {}
}))

const UserSettings = () => {
    const navigate = useNavigate()
    const location = useLocation()
    let history = createBrowserHistory()
    const { section } = useParams()
    const { width } = useWindowSize()
    const classes = useStyles()

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <div className={classes.back}>
                <Back callback={() => navigate(-1)} />
            </div>
            <div>
                <h1>Settings</h1>
            </div>
        </div>
    )
}

export default UserSettings
