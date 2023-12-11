import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import Modal from '../../../UI/Components/Modal';

const testComponent = 'Modal';

test( `Test component: ${testComponent} -- empty/not-empty ${testComponent.toLowerCase()}`, () => {
    const text = `This is a test ${testComponent.toLowerCase()}`;
    let component = <Modal />;
    const {rerender} = render( component );
    expect( screen.queryByText( text ) ).not.toBeInTheDocument();

    component = <Modal message={text} />;
    rerender( component );
    expect( screen.queryByText( text ) ).toBeInTheDocument();
} );

test( `Test component: ${testComponent} -- isAlert and clicks`, () => {
    const text = `This is a test ${testComponent.toLowerCase()}`;
    const successText = 'Yes';
    let component = <Modal message={text} isAlert={ true } successButtonText={successText} />;
    const {rerender} = render( component );
    expect( screen.queryByText( successText ) ).not.toBeInTheDocument();

    const handleClick = jest.fn();

    component = <Modal message={text} isAlert={ false } successButtonText={successText} onSuccess={handleClick} close={handleClick} />;
    rerender(component);
    expect( screen.queryByText( successText ) ).toBeInTheDocument();
    fireEvent.click( screen.queryByText( successText ) );
    fireEvent.click( screen.queryByText( 'Close' ) );
    expect( handleClick ).toHaveBeenCalledTimes(2);
} );
