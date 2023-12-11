import {render, screen, fireEvent, renderHook} from '@testing-library/react'
import '@testing-library/jest-dom'
import Category from '../../../UI/Components/Category';

test( 'Testing category', () => {
    const category = {
        id: 1,
        data: {
            title: 'Todo',
            description: 'This is todo list',
            userId: 1
        }
    };
    let component = (
        <Category
            category={ category }
            categories={ { categories: [], setCategories: () => {} } }
            refreshComponent={ { refreshComponent: null, setRefreshComponent: () => {} } }
        />
    );
    const {result} = renderHook(() => component);
    render( <>{result}</> );
    // console.log('result',result);
    expect( screen.queryByText( 'Todo' ) ).toBeInTheDocument();
    // render( component );
} );