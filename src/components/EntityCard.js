// material-ui

import { DataGrid } from '@mui/x-data-grid';
import { Box, Container, FormControl } from '../../node_modules/@mui/material/index';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MainCard from 'components/MainCard';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi, ROLES } from '../use-api';
import { useState } from 'react';

import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

// ==============================|| SAMPLE PAGE ||============================== //

const EntityCard = ({ columns, listApi, getRowId = (r) => r.id, dialog: Dialog }) => {
    const opts = {
        audience: 'https://customer-mgmt-api'
    };
    const [message, setMessage] = useState(null);
    const { login, getAccessTokenWithPopup } = useAuth0();
    const { loading, error, refresh, data } = useApi([listApi], opts);
    const [selected, setSelected] = useState(null);

    const handleRowClick = ({ row }) => {
        setSelected(row);
    };

    const handleClose = () => {
        setSelected(null);
    };

    const getTokenAndTryAgain = async () => {
        await getAccessTokenWithPopup(opts);
        refresh();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        if (error.error === 'login_required') {
            return <button onClick={() => login(opts)}>Login</button>;
        }
        if (error.error === 'consent_required') {
            return <button onClick={getTokenAndTryAgain}>Consent to reading users</button>;
        }
        return <div>Oops {error.message}</div>;
    }

    return (
        <>
            {message && (
                <Alert
                    severity="info"
                    onClose={() => {
                        setMessage(null);
                    }}
                >
                    <AlertTitle>Info</AlertTitle>
                    {message}
                </Alert>
            )}
            <MainCard>
                <DataGrid
                    autoHeight
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={getRowId}
                    disableSelectionOnClick
                    onRowClick={handleRowClick}
                />
            </MainCard>
            <Dialog onClose={handleClose} entity={selected} open={!!selected} />
        </>
    );
};

export default EntityCard;
