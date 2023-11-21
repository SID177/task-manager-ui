import _ from 'lodash';
import { apiBase, tokenPath } from './const';
import { post } from './common';

const storageKey = 'loginToken';

const getCurrentUserData = () => {
    const user = localStorage.getItem( storageKey );
    return _.isEmpty( user ) ? false : JSON.parse( user );
};

const logout = () => localStorage.removeItem( storageKey );

const login = async ( { username, password } ) => {
    if ( _.isEmpty( username ) || _.isEmpty( password ) ) {
        return false;
    }

    const url = apiBase + tokenPath;
    const resp = await post( url, { username, password } );

    if ( _.isEmpty( resp?.data?.token ) ) {
        return false;
    }

    localStorage.setItem( storageKey, JSON.stringify( resp.data ) );

    return resp;
};

export { login, getCurrentUserData, logout };
