import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Alert from '../../../UI/Components/Alert';

test( 'Test component: Alert', () => {
    const text = 'This is a test alert';
    let component = <Alert text={ text } />;
    render( component );
    let element = screen.getByText( text );
    expect( element ).toBeInTheDocument();

    component = (
        <Alert text={ text }>
            <button>Hello World</button>
        </Alert>
    );
    render(component);
    element = screen.getByText( 'Hello World' );
    expect( element ).toBeInTheDocument();
} );
