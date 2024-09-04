import { useRoutes, Navigate } from 'react-router'
import PublicRoute from './route-guards/public-route'
import PrivateRoute from './route-guards/private-route'
import {routeNames} from './utilities/constants'
import PageNotFound from './pages/page-not-found'
import Signup from './pages/auth/signup'
import Login from './pages/auth/login'
import ResetPassword from './pages/auth/reset-password'
import ForgotPassword from './pages/auth/forgot-password'
import SignupActivation from './pages/auth/signup-activation'
import Homepage from './pages/homepage'
import UserSettings from './pages/user-settings'
import PublicLayout from "./containers/public-layout"
import PrivateLayout from "./containers/private-layout"
import Typography from "./pages/component-pages/typography"
import Alerts from "./pages/component-pages/alerts"
import SelectsShow from "./pages/component-pages/selects-show"
import Inputs from "./pages/component-pages/input"
import Checkboxes from "./pages/component-pages/checkbox"
import Radios from "./pages/component-pages/radio"
import TogglePage from "./pages/component-pages/toggle"
import AccordionPage from "./pages/component-pages/accordion"
import TablePage from "./pages/component-pages/table"
import Chips from "./pages/component-pages/chips"
import InputSlider from "./pages/component-pages/input-slider"
import InputCurrency from "./pages/component-pages/input-currency"
import InputDatetimePage from "./pages/component-pages/input-datetime"
import Carousel from "./pages/component-pages/carousel"
import ChatBot from './pages/chatbot/ChatBot'

const AppRoutes = () =>
    useRoutes([
        {
            element: <PrivateRoute />, // Authenticated User Layout Route
            children: [
                {
                    element: <PrivateLayout withHeader />,
                    children: [
                        {exact: true, path: routeNames.USER_SETTINGS, element: <UserSettings />},
                        {exact: true, path: routeNames.HOME, element: <Homepage />},
                        {exact: true, path: routeNames.ROOT_TYPOGRAPHY, element: <Typography />},
                        {exact: true, path: routeNames.ROOT_INPUT, element: <Inputs />},
                        {exact: true, path: routeNames.ROOT_ALERTS, element: <Alerts />},
                        {exact: true, path: routeNames.ROOT_CHECKBOX, element: <Checkboxes />},
                        {exact: true, path: routeNames.ROOT_CHIPS, element: <Chips />},
                        {exact: true, path: routeNames.ROOT_RADIO, element: <Radios />},
                        {exact: true, path: routeNames.ROOT_SELECT, element: <SelectsShow />},
                        {exact: true, path: routeNames.ROOT_TOGGLE, element: <TogglePage />},
                        {exact: true, path: routeNames.ROOT_ACCORDION, element: <AccordionPage />},
                        {exact: true, path: routeNames.ROOT_TABLE, element: <TablePage />},
                        {exact: true, path: routeNames.ROOT_INPUT_SLIDER, element: <InputSlider />},
                        {exact: true, path: routeNames.ROOT_INPUT_CURRENCY, element: <InputCurrency />},
                        {exact: true, path: routeNames.ROOT_INPUT_DATETIME, element: <InputDatetimePage />},
                        {exact: true, path: routeNames.ROOT_CAROUSEL, element: <Carousel/>},
                        {exact: true, path: routeNames.ROOT_CHATBOT, element: <ChatBot/>}
                    ],
                },
                
            ],
        },
        {
            element: <PublicRoute />, // Anonymous User Layout Route
            children: [
                {
                    element: <PublicLayout />,
                    children: [
                        {
                            exact: true,
                            path: routeNames.SIGNUP,
                            element: <Signup />,
                        },
                        {
                            exact: true,
                            path: routeNames.LOGIN,
                            element: <Login />,
                        },
                        {
                            exact: true,
                            path: routeNames.FORGOT_PASSWORD,
                            element: <ForgotPassword />,
                        },
                        {
                            exact: true,
                            path: routeNames.RESET_PASSWORD,
                            element: <ResetPassword />,
                        },
                        {
                            exact: true,
                            path: routeNames.ACTIVATION,
                            element: <SignupActivation />,
                        },
                    ],
                },
            ],
        },
        {
            element: <PrivateLayout />,
            children: [
                {
                    path: routeNames.NOT_FOUND, // Not found route
                    element: <PageNotFound />,
                },
                {
                    path: '/chatbot',
                    element: <Navigate to={routeNames.ROOT_CHATBOT} />,
                },
            ],
        },
        
    ])

export default AppRoutes
