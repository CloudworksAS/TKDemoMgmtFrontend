import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useApi, useApiMutation, SCOPES, SCOPES_FOR_ROLE, ADD_SCOPE_TO_ROLE, REMOVE_SCOPE_FROM_ROLE } from 'use-api';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const RoleScopes = ({ roleid }) => {
    const opts = {
        audience: 'https://customer-mgmt-api'
    };
    const { login, getAccessTokenWithPopup } = useAuth0();
    const { loading, error, refresh, data } = useApi([SCOPES, SCOPES_FOR_ROLE], opts, [null, { roleid }]);
    const [addScopeToRole, removeScopeFromRole] = useApiMutation([ADD_SCOPE_TO_ROLE, REMOVE_SCOPE_FROM_ROLE], opts);
    const [scopesForRole, setScopesForRole] = useState(null);

    const getTokenAndTryAgain = () => {
        return async () => {
            await getAccessTokenWithPopup(opts);
            refresh();
        };
    };

    if (loading) {
        return <div>Loading scopes...</div>;
    }

    if (error) {
        if (error.error === 'login_required') {
            return <button onClick={() => login(opts)}>Login</button>;
        }
        if (error.error === 'consent_required') {
            return <button onClick={getTokenAndTryAgain()}>Consent to reading users</button>;
        }
        return <div>Oops {error.message}</div>;
    }

    const currentScopes = scopesForRole || data[1].map((s) => s.permission_name);

    const handleScopeChange = (_, newValue) => {
        const addedScopes = newValue.filter((v) => !currentScopes.includes(v));
        const removedScopes = currentScopes.filter((v) => !newValue.includes(v));

        addedScopes.forEach((scopename) => addScopeToRole({ roleid, scopename }));
        removedScopes.forEach((scopename) => removeScopeFromRole({ roleid, scopename }));

        setScopesForRole(newValue);
    };

    return (
        <Autocomplete
            multiple
            id="scopes"
            options={data[0].map((s) => s.value)}
            value={currentScopes}
            renderInput={(params) => <TextField {...params} variant="standard" label="Scopes" />}
            onChange={handleScopeChange}
        />
    );
};

export default RoleScopes;
