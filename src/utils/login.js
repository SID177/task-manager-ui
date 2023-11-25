import _ from 'lodash';
import { apiBase, tokenPath, usersPath } from './const';
import { post, get } from './common';

const storageKey = 'loginToken';

const getCurrentUserData = () => {
    const user = localStorage.getItem( storageKey );
    return _.isEmpty( user ) ? null : JSON.parse( user );
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

const fetchAvatar = async () => {
    const user = getCurrentUserData();
    if ( ! user.user_id ) {
        return false;
    }

    return await get( apiBase + usersPath );
};

export { login, getCurrentUserData, logout, fetchAvatar };
