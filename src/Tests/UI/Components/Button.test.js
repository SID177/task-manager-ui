import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Button from '../../../UI/Components/Button';

test( 'Test component: Button', () => {
    const text = 'This is a test button';
    let component = <Button>{ text }</Button>;
    render( component );
    let element = screen.getByText( text );
    expect( element ).toBeInTheDocument();
} );

test( 'Test component: Button -- click', () => {
    const text = 'This is a test button';

    const handleClick = jest.fn();

    let component = (<Button onClick={ handleClick }>{ text }</Button>);
    render(component);
    fireEvent.click( screen.getByText( text ) );
    expect( handleClick ).toHaveBeenCalledTimes(1);
} );
