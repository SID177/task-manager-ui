import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import NotFound from '../../../UI/Pages/404';

test( 'Testing 404 page', () => {
    render( <NotFound /> );
    expect( screen.getByText( '404' ) ).toBeInTheDocument();
} );
