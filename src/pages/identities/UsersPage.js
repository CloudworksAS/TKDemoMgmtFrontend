// material-ui
import EntityCard from 'components/EntityCard';
import UserDialog from 'components/users/UserDialog';
import { USERS } from '../../use-api';

const columns = [
    {
        field: 'user_id',
        headerName: 'ID',
        width: 300,
        editable: false
    },
    {
        field: 'email',
        headerName: 'E-mail',
        width: 110,
        editable: false
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: false
    }
];

const getRowId = (r) => r.user_id;

// ==============================|| SAMPLE PAGE ||============================== //

const UsersPage = () => <EntityCard columns={columns} getRowId={getRowId} listApi={USERS} dialog={UserDialog} />;

export default UsersPage;
