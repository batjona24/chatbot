import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {selectAccessToken} from '../../store/slices/user'
import {routeNames} from "../../utilities/constants";

const PublicRoute = (props) => {
    const accessToken = useSelector(selectAccessToken)

    return accessToken ? (
        <Navigate to={routeNames.HOME} />
    ) : (
        <Outlet />
    )
}

export default PublicRoute
