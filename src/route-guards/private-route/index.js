import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {selectAccessToken} from '../../store/slices/user'
import {routeNames} from '../../utilities/constants'

const PrivateRoute = (props) => {
    const accessToken = useSelector(selectAccessToken)
    return accessToken ? (
        <Outlet/>
    ) : (
        <Navigate to={routeNames.LOGIN}/>
    )
}

export default PrivateRoute
