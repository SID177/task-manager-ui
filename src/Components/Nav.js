import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/login';

const Nav = ( { setCurrentUser } ) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setCurrentUser( null );
        navigate( '/' );
    };

    return (
    <nav className="app__navigation">

        <Link to="/" className="hover:text-gray-300">
            Tasks
        </Link>
        <div className="absolute top-12 left-0 bg-white border border-gray-200 p-2 rounded-md shadow-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300">
            <Link to="/new-task" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Create New
            </Link>
        </div>
        <Link to="/category" className="hover:text-gray-300">
            Category
        </Link>
        <button
            type="button"
            className="hover:text-gray-300"
            onClick={ handleLogout }
        >
            Logout
        </button>
    </nav>
        
    );
};

export default Nav;
