import React from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store'
import { axiosAttachInterceptors } from './utilities/axios/utils'
import "./i18n"

const history = createBrowserHistory({ basename: '/' })
const { requestInterceptor, responseInterceptor } = axiosAttachInterceptors()
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <>
        <Provider store={store}>
            <Router history={history} basename={'/'}>
                <App tab="home"/>
            </Router>
        </Provider>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
