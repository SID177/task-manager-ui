import { useState } from 'react';
import _, { isEmpty } from 'lodash';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { getCurrentUser, logout, login } from '../Data/auth';

// import Login from './Pages/Login';
// import Page from './Components/Page';
// import Nav from './Components/Nav';
// import Header from './Components/Header';
// import Tasks from "./Pages/Tasks";
// import NotFound from './Pages/404';

/**
 * 
 * @returns JSX
 */
const App = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [appRefresh, setAppRefresh] = useState(false);
  const navigate = useNavigate();

  login();

  // const user = getCurrentUser();
  // if (!isEmpty(user) && isEmpty(currentUser)) {
  //   setCurrentUser(user);
  // }

  // const handleLogout = () => {
  //   logout()
  //     .then(() => {
  //       setCurrentUser(null);
  //       navigate( '/' );
  //     });
  // };

  // const handleRefresh = () => {
  //   navigate( '/' );
  //   setAppRefresh(true);
  // };

  return (
    <div className={'app' + (_.isEmpty(currentUser) ? ' login' : '') + ' min-h-screen h-full bg-neutral'}>
      {/* {!_.isEmpty(currentUser) ? (
        <>
          <Header>
            <Nav
              handleRefresh={ handleRefresh }
              handleLogout={ handleLogout }
              profilePic={ user.photoURL }
            />
          </Header>

          <div className="w-full py-8">
            <Page>
              <Routes>
                  <Route path="/" element={<Tasks refresh={{ appRefresh, setAppRefresh }} />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
            </Page>
          </div>
        </>
      ) : (
        <Login setCurrentUser={setCurrentUser} />
      )} */}
    </div>
  );
};

export default App;
