// use-api.js
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const audience = 'https://customer-mgmt-api';
const baseUrl = 'http://localhost:8081';

export const ROLES = '/roles';
export const SCOPES = '/scopes';
export const SCOPES_FOR_ROLE = '/roles/:id/scopes';
export const USERS = '/users';
export const ROLES_FOR_USER = '/users/:id/roles';
export const ADD_SCOPE_TO_ROLE = {
    path: '/roles/:id/scopes/:value',
    method: 'POST'
};
export const REMOVE_SCOPE_FROM_ROLE = {
    path: '/roles/:id/scopes/:value',
    method: 'DELETE'
};
export const ADD_ROLE_TO_USER = {
    path: '/users/:id/roles/:value',
    method: 'POST'
};
export const REMOVE_ROLE_FROM_USER = {
    path: '/users/:id/roles/:value',
    method: 'DELETE'
};

const replaceParams = (path, params) => {
    const pathVarsRE = /\:(.*?)(?:\/|$)/g;
    let match = pathVarsRE.exec(path);
    let newPath = '' + path;
    while (match != null) {
        var key = match[1];
        newPath = newPath.replaceAll(`:${key}`, params[key]);
        match = pathVarsRE.exec(path);
    }
    return newPath;
};

export const useApi = (paths, options = {}, params = []) => {
    const opts = { audience, ...options };
    const { getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState({
        error: null,
        loading: true,
        data: null
    });
    const [refreshIndex, setRefreshIndex] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const { audience, scope, ...fetchOptions } = opts;
                const accessToken = await getAccessTokenSilently({ audience, scope });

                const responses = await Promise.all(
                    paths.map((path, idx) => {
                        //                        let path = typeof api === 'object' && api !== null ? api.url : api;
                        if (params.length >= idx) path = replaceParams(path, params[idx]);
                        const url = `${baseUrl}${path}`;

                        return fetch(url, {
                            ...fetchOptions,
                            headers: {
                                ...fetchOptions.headers,
                                // Add the Authorization header to the existing headers
                                Authorization: `Bearer ${accessToken}`
                            }
                        });
                    })
                );

                let data = await Promise.all(responses.map((r) => r.json()));
                if (data.length == 1) data = data[0];
                setState({
                    ...state,
                    data,
                    error: null,
                    loading: false
                });
            } catch (error) {
                setState({
                    ...state,
                    error,
                    loading: false
                });
            }
        })();
    }, [refreshIndex]);

    return {
        ...state,
        refresh: () => setRefreshIndex(refreshIndex + 1)
    };
};

export const useApiMutation = (apis, options = {}) => {
    const opts = { audience, ...options };
    const { getAccessTokenSilently } = useAuth0();

    return apis.map((api) => async (params) => {
        const { audience, scope, ...fetchOptions } = opts;
        const accessToken = await getAccessTokenSilently({ audience, scope });
        const path = replaceParams(api.path, params);
        const url = `${baseUrl}${path}`;

        fetch(url, {
            ...fetchOptions,
            method: api.method,
            headers: {
                ...fetchOptions.headers,
                // Add the Authorization header to the existing headers
                Authorization: `Bearer ${accessToken}`
            }
        });
    });
};
