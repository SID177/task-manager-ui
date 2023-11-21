import _ from 'lodash';
import { useState } from 'react';
import { login } from '../utils/login';

const Login = ( { setCurrentUser } ) => {
    const [ username, setUsername ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ loginResponse, setLoginResponse ] = useState( false );

    const handleLogin = ( e ) => {
        e.preventDefault();

        login( { username, password } )
        .then( resp => {
            if ( ! resp ) {
                setLoginResponse( 'Invalid username or password' );
            } else {
                setCurrentUser( resp );
            }
        } );

        return false;
    };

    if ( loginResponse ) {
        setTimeout( () => setLoginResponse( false ), 5000 );
    }

    return (
        <div className="app__login">
            <div className="app__login-container login">
                <h2 className="login__header">Login</h2>

                { !!loginResponse && <div className="login__response">{ loginResponse }</div> }

                <form onSubmit={ handleLogin } className="login__form">
                    <div className="login__username login__field">
                        <label htmlFor="username" className="login__username-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="login__username-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="login__password login__field">
                        <label htmlFor="password" className="login__password-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="login__password-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="button"
                    >Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
