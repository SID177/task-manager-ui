import { useState } from 'react';
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
  const [ appRefresh, setAppRefresh ] = useState( false );

  const savedUser = getCurrentUserData();
  if ( _.isEmpty( currentUser ) && ! _.isEmpty( savedUser ) ) {
    setCurrentUser( savedUser );
  }

  return (
    <div className={ 'app' + ( _.isEmpty( currentUser ) ? ' login' : '' ) + ' min-h-screen h-full bg-neutral' }>
      { ! _.isEmpty( currentUser ) ? (
        <>
          <Header>
            <Nav setCurrentUser={ setCurrentUser } refresh={ () => setAppRefresh( true ) } />
          </Header>

          <div className="app__content">
            <Page refresh={ { appRefresh, setAppRefresh } } />
          </div>
        </>
      ) : (
        <Login setCurrentUser={ setCurrentUser } />
      ) }
    </div>
  );
};

export default App;
