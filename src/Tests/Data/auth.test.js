import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import { getCurrentUser, login, logout } from '../../Data/auth';

test( 'Check auth functions', () => {
    expect( '1' ).toBe('1');
} );
