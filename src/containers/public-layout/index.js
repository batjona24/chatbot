import { createUseStyles } from 'react-jss'
import Alert from '../../components/Alert'
import {
    selectAlertMessage,
    toggleAlert,
} from '../../store/slices/app'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import ChangeLanguageSelect from "../../components/ChangeLanguageSelect"

const useStyles = createUseStyles((theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    alerts: {
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.alert
    },
}))

const PublicLayout = () => {
    const dispatch = useDispatch()

    const {
        variant: alertVariant,
        message: alertMessage,
        title: alertTitle,
        visible: alertVisbile,
    } = useSelector(selectAlertMessage)

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.alerts}>
                {alertVisbile && (
                    <Alert
                        visible={alertVisbile}
                        variant={alertVariant}
                        message={alertMessage}
                        title={alertTitle}
                        dismissTimeout={5000}
                        dismissCallback={() =>
                            dispatch(toggleAlert({ visible: false }))
                        }
                    />
                )}
            </div>
            <Outlet/>
            <footer className="container">
                <div className="row justify-content-end">
                    <div className="col-auto">
                        <ChangeLanguageSelect/>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default PublicLayout
