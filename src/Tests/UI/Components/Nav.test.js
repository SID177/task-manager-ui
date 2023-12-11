import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import Nav from '../../../UI/Components/Nav';

const testComponent = 'Nav';

test( `Test component: ${testComponent}}`, () => {
    const handleLogout = jest.fn();
    const handleRefresh = jest.fn();
    let component = <Nav handleLogout={ handleLogout } handleRefresh={ handleRefresh } profilePic="" />;
    render( component );
    expect( screen.queryByText( 'Task-manager' ) ).toBeInTheDocument();
    expect( screen.queryByAltText( 'User Profile Pic' ) ).toBeInTheDocument();

    fireEvent.click( screen.queryByAltText( 'User Profile Pic' ) );
    expect( screen.queryByText( 'Logout' ) ).toBeInTheDocument();
    fireEvent.click( screen.queryByText( 'Logout' ) );

    expect( handleLogout ).toHaveBeenCalledTimes(1);

    fireEvent.click( screen.queryByText( 'Task-manager' ) );

    expect( handleRefresh ).toHaveBeenCalledTimes(1);
} );
