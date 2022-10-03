import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <StrictMode>
        <Auth0Provider
            domain="dev-ub-vnov4.us.auth0.com"
            clientId="JWR73qM1DXu5G3dsa5RzERp5qfsOcaLR"
            redirectUri={window.location.origin + '/free'}
            audience="https://customer-mgmt-api"
        >
            <ReduxProvider store={store}>
                <BrowserRouter basename="/free">
                    <App />
                </BrowserRouter>
            </ReduxProvider>
        </Auth0Provider>
    </StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
