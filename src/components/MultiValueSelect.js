import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useApi } from 'use-api';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const MultiValueSelect = ({
    id,
    label,
    entityId,
    optionsApi,
    valuesApi,
    addValue,
    removeValue,
    optionsMap = (o) => ({ id: o.id, label: o.name }),
    valuesMap = (o) => ({ id: o.id, label: o.name })
}) => {
    const opts = {
        audience: 'https://customer-mgmt-api'
    };
    const { login, getAccessTokenWithPopup } = useAuth0();
    const { loading, error, refresh, data } = useApi([optionsApi, valuesApi], opts, [null, { id: entityId }]);
    const [values, setValues] = useState(null);

    const getTokenAndTryAgain = () => {
        return async () => {
            await getAccessTokenWithPopup(opts);
            refresh();
        };
    };

    if (loading) {
        return <div>Loading {label}...</div>;
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

    const currentValues = values || data[1].map(valuesMap);

    const handleValuesChange = (_, newValues) => {
        const addedValues = newValues.filter((v) => !currentValues.includes(v));
        const removedValues = currentValues.filter((v) => !newValues.includes(v));

        addedValues.forEach((value) => addValue({ id: entityId, value: value.id }));
        removedValues.forEach((value) => removeValue({ id: entityId, value: value.id }));

        setValues(newValues);
    };

    return (
        <Autocomplete
            multiple
            id={id}
            options={data[0].map(optionsMap)}
            value={currentValues}
            renderInput={(params) => <TextField {...params} variant="standard" label={label} />}
            onChange={handleValuesChange}
        />
    );
};

export default MultiValueSelect;
