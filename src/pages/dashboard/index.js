import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const { loginWithRedirect, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState(null);

    const sub = user?.sub;

    useEffect(() => {
        const getAccessToken = async () => {
            const domain = 'dev-ub-vnov4.us.auth0.com';

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://customer-mgmt-api`
                });
                setAccessToken(accessToken);
            } catch (e) {
                console.error('getAccessToken', e.message);
            }
        };

        getAccessToken();
    }, [getAccessTokenSilently, sub]);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return isAuthenticated ? (
        <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <h3>Access token</h3>
            {accessToken ? <pre>{accessToken}</pre> : 'No access token retrieved'}
        </div>
    ) : (
        // <Button onClick={() => loginWithRedirect()}>Log In</Button>
        <Typography variant="h4">Welcome. Please login to continue.</Typography>
    );
};

export default DashboardDefault;
