import { useState, useEffect } from 'react';
import _ from 'lodash';

import { getCurrentUserData } from './utils/login';

import Login from './Pages/Login';

import Page from './Components/Page';
import Nav from './Components/Nav';
import Header from './Components/Header';

/**
 * 
 * @returns JSX
 */
const App = () => {

  const [ currentUser, setCurrentUser ] = useState( null );

  useEffect( () => {
    const currentUserData = getCurrentUserData();
    if ( ! _.isEmpty( currentUserData ) ) {
      setCurrentUser( currentUserData );
    }
  }, [] );

  return (
    <div className={ 'app' + ( _.isEmpty( currentUser ) ? ' login' : '' ) }>
      { !!currentUser ? (
        <>
          <Header>
            <h1 className="app__name">Task Manager</h1>
            <Nav setCurrentUser={ setCurrentUser } />
          </Header>

          <div className="app__content">
            <Page />
          </div>
        </>
      ) : (
        <Login setCurrentUser={ setCurrentUser } />
      ) }
    </div>
  );
};

export default App;
