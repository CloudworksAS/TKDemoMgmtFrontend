// material-ui

import { DataGrid } from '@mui/x-data-grid';
import { Box, Container } from '../../../node_modules/@mui/material/index';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MainCard from 'components/MainCard';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../../use-api';
import { useState } from 'react';
import { useParams } from 'react-router';

// ==============================|| SAMPLE PAGE ||============================== //

const RolePage = () => {
    const { id } = useParams();
    return <MainCard>{id}</MainCard>;
};

export default RolePage;
