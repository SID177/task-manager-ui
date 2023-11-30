import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, setPersistence, inMemoryPersistence, browserSessionPersistence } from '@firebase/auth';
import { isNull } from 'lodash';

const storageKey = 'login-user';
const getStoredUser = () => {
    try {
        return JSON.parse( localStorage.getItem( storageKey ) );
    } catch ( e ) {
        return false;
    }
};
const setStoredUser = ( user ) => localStorage.setItem( storageKey, JSON.stringify( user ) );
const deleteStoredUser = () => localStorage.removeItem( storageKey );

const getCurrentUser = () => {
    const auth = getAuth();
    return auth.currentUser || getStoredUser();
};

const googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    let result = null;
    let error = null;
    let user = getCurrentUser();

    if ( ! user ) {
        try {
            await setPersistence( auth, browserSessionPersistence );
            result = await signInWithPopup( auth, provider );
        } catch ( er ) {
            error = er;
        }

        if ( ! isNull( result ) ) {
            const credential = GoogleAuthProvider.credentialFromResult( result );
            const token = credential.accessToken;
            user = result.user;
            user.token = token;
        }
    }

    setStoredUser( user );

    return { user, error };
};

const login = async () => {
    return await googleAuth();
};

const logout = async () => {
    try {
        await signOut( getAuth() );
        deleteStoredUser();
    } catch ( e ) {
        return e;
    }
};

export { getCurrentUser, login, logout };
