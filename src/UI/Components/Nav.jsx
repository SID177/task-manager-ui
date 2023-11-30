import { useNavigate } from 'react-router-dom';

import { logout, getCurrentUser } from '../../Data/auth';

const Nav = ({ setCurrentUser, refresh }) => {
    const navigate = useNavigate();

    /**
     * Call logout functions.
     */
    const handleLogout = () => {
        logout()
            .then(() => {
                setCurrentUser(null);
                navigate('/');
            });
    };

    const handleRefresh = () => {
        navigate('/');
        refresh();
    };

    return (
        <div className="navbar">
            <div className="flex-1">
                <a onClick={handleRefresh} className="btn btn-ghost text-xl">Task-manager</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={getCurrentUser().photoURL} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52 glass">
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Nav;
