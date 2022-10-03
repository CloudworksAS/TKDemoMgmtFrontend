import Dialog from 'components/Dialog';
import MultiValueSelect from 'components/MultiValueSelect';
import TextField from '@mui/material/TextField';
import { Box } from '../../../node_modules/@mui/material/index';
import { useApiMutation, SCOPES, SCOPES_FOR_ROLE, ADD_SCOPE_TO_ROLE, REMOVE_SCOPE_FROM_ROLE } from 'use-api';

function RoleDialog({ entity, open, onClose }) {
    const [addScopeToRole, removeScopeFromRole] = useApiMutation([ADD_SCOPE_TO_ROLE, REMOVE_SCOPE_FROM_ROLE]);

    return (
        <Dialog title={'Role: ' + entity?.name} open={open} onClose={onClose}>
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
                    defaultValue={entity?.id}
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
                <TextField
                    id="description"
                    label="Description"
                    defaultValue={entity?.description}
                    InputProps={{
                        readOnly: true
                    }}
                    variant="standard"
                />
                <MultiValueSelect
                    id="scopes"
                    label="Scopes"
                    entityId={entity?.id}
                    optionsApi={SCOPES}
                    valuesApi={SCOPES_FOR_ROLE}
                    addValue={addScopeToRole}
                    removeValue={removeScopeFromRole}
                    optionsMap={(o) => ({ id: o.value, label: o.value })}
                    valuesMap={(o) => ({ id: o.permission_name, label: o.permission_name })}
                />
            </Box>
        </Dialog>
    );
}

export default RoleDialog;
