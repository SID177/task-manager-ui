import _ from 'lodash';
import { useState } from 'react';
import { login } from '../utils/login';
import Alert from '../Components/Alert';

const Login = ( { setCurrentUser } ) => {
    const [ username, setUsername ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ loginResponse, setLoginResponse ] = useState( false );
    const [ loading, setLoading ] = useState( false );

    const handleLogin = ( e ) => {
        e.preventDefault();
        setLoading( true );

        login( { username, password } )
        .then( resp => {
            setLoading( false );

            if ( ! resp ) {
                setLoginResponse( 'Invalid username or password' );
            } else {
                setCurrentUser( resp );
            }
        } )
        .catch( () => {
            setLoading( false );
            setLoginResponse( 'Invalid username or password' );
        } );

        return false;
    };

    if ( ! _.isEmpty( loginResponse ) ) {
        setTimeout( () => setLoginResponse( false ), 5000 );
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={ handleLogin }>
                        { ! _.isEmpty( loginResponse ) && <Alert text={ loginResponse } /> }
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username or Email</span>
                            </label>
                            <input
                                value={ username }
                                onChange={ ( e ) => setUsername( e.target.value ) }
                                type="text"
                                placeholder="username or email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                value={ password }
                                onChange={ ( e ) => setPassword( e.target.value ) }
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button disabled={ loading } className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

{/* <div className="app__login">
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
        </div> */}
