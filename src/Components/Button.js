import { useState } from "react";

const Button = ( { className, children, onClick, type = '' } ) => {
    const [ clicked, setClicked ] = useState( false );

    /**
     * Checks whether current object is promise or not
     *
     * @param {Object} obj Object.
     * @returns {Boolean}
     */
    const isPromise = ( obj ) => '[object Promise]' === Object.prototype.toString.call( obj );

    return (
        <button
            className={ className }
            disabled={ clicked }
            onClick={ ( e ) => {
                setClicked( true );
                const resp = onClick( e );
                if ( resp && isPromise( resp ) ) {
                    resp.then( () => setClicked( false ) );
                } else {
                    setClicked( false );
                }
            } }
        >
            { children }
            { 'cancel' === type && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) }
            { 'edit' === type && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            ) }
        </button>
    );
};

export default Button;
