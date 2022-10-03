// material-ui
import { USERS } from '../../use-api';

const columns = [
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

const getRowId = (r) => r.email;

// ==============================|| SAMPLE PAGE ||============================== //

const UsersPage = () => {
    const opts = {
        audience: 'https://customer-mgmt-api'
    };
    const { login, getAccessTokenWithPopup } = useAuth0();
    const { loading, error, refresh, data: users } = useApi([USERS], opts);
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
        <MainCard>
            <DataGrid
                autoHeight
                autoWidth
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(r) => r.email}
                disableSelectionOnClick
            />
        </MainCard>
    );
};

export default UsersPage;
