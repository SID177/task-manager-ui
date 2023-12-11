import { isEmpty, isNull } from 'lodash';
import { useState } from 'react';
import { login } from '../../Data/auth';
import Alert from '../Components/Alert';

const Login = ({ setCurrentUser }) => {
    const [loginResponse, setLoginResponse] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        login()
            .then(({ user, error }) => {
                if (!isNull(user)) {
                    setLoginResponse('');
                    setCurrentUser(user);
                }
                if (!isEmpty(error?.message)) {
                    setLoginResponse(error.message);
                }
            });

        return false;
    };

    if (!isEmpty(loginResponse)) {
        setTimeout(() => setLoginResponse(false), 5000);
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleLogin}>
                        {!isEmpty(loginResponse) && <Alert text={loginResponse} />}
                        {/* <div className="form-control">
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
                        </div> */}
                        <div className="form-control mt-0">
                            <button role="login-button" disabled={loading} className="btn btn-primary">Login with Google</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
