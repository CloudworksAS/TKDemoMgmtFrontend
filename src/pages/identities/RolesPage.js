// material-ui

import EntityCard from 'components/EntityCard';
import RoleDialog from 'components/roles/RoleDialog';
import { ROLES } from 'use-api';

const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        editable: false
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 400,
        editable: false
    }
];

// ==============================|| SAMPLE PAGE ||============================== //

const RolesPage = () => <EntityCard columns={columns} listApi={ROLES} dialog={RoleDialog} />;

export default RolesPage;
