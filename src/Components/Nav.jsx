import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAvatar, logout } from '../utils/login';
import _ from 'lodash';

const Nav = ( { setCurrentUser, refresh } ) => {
    const navigate = useNavigate();

    const [ avatarUrl, setAvatarUrl ] = useState( '' );

    /**
     * Call logout functions.
     */
    const handleLogout = () => {
        logout();
        setCurrentUser( null );
        navigate( '/' );
    };

    /**
     * Fetch avatar.
     */
    const handleFetchAvatar = () => {
        fetchAvatar()
        .then( resp => {
            if ( ! resp || ! _.isArray( resp.data ) ) {
                return;
            }

            setAvatarUrl( resp.data[0].avatar_urls[48] );
        } );
    };

    const handleRefresh = () => {
        navigate( '/' );
        refresh();
    };

    useEffect( handleFetchAvatar, [] );

    return (
        <div className="navbar position-relative">
            <div className="flex-1">
                <a onClick={ handleRefresh } className="btn btn-ghost text-xl">Task-manager</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={ avatarUrl } />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52 glass">
                        <li><a onClick={ handleLogout }>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
    );
};

export default Nav;
