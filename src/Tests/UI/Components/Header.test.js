import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../../../UI/Components/Header';

const testComponent = 'Header';

test( `Test component: ${testComponent}`, () => {
    const text = `This is a test ${testComponent.toLowerCase()}`;
    let component = <Header>{ text }</Header>;
    render( component );
    let element = screen.getByText( text );
    expect( element ).toBeInTheDocument();
} );
