import Dialog from 'components/Dialog';
import MultiValueSelect from 'components/MultiValueSelect';
import TextField from '@mui/material/TextField';
import { Box } from '../../../node_modules/@mui/material/index';
import { useApiMutation, ROLES, ROLES_FOR_USER, ADD_ROLE_TO_USER, REMOVE_ROLE_FROM_USER } from 'use-api';

function UserDialog({ entity, open, onClose }) {
    const [addRoleToUser, removeRoleFromUser] = useApiMutation([ADD_ROLE_TO_USER, REMOVE_ROLE_FROM_USER]);

    return (
        <Dialog title={'User: ' + entity?.name} open={open} onClose={onClose}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                    display: 'flex',
                    flexDirection: 'column'
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="id"
                    label="ID"
                    defaultValue={entity?.user_id}
                    InputProps={{
                        readOnly: true
                    }}
                    variant="standard"
                />
                <TextField
                    id="email"
                    label="Email"
                    defaultValue={entity?.email}
                    InputProps={{
                        readOnly: true
                    }}
                    variant="standard"
                />
                <TextField
                    id="name"
                    label="Name"
                    defaultValue={entity?.name}
                    InputProps={{
                        readOnly: true
                    }}
                    variant="standard"
                />
                <MultiValueSelect
                    id="roles"
                    label="Roles"
                    entityId={entity?.user_id}
                    optionsApi={ROLES}
                    valuesApi={ROLES_FOR_USER}
                    addValue={addRoleToUser}
                    removeValue={removeRoleFromUser}
                />
            </Box>
        </Dialog>
    );
}

export default UserDialog;
