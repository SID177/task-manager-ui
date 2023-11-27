import { useState, useEffect } from 'react';
import _ from 'lodash';

import { categories as glCategories } from '../utils/const';
import { fetchCategories } from '../utils/categories';
import TaskList from '../Components/TaskList';
import NewCategory from '../Components/NewCategory';
import Modal from '../Components/Modal';

const Tasks = ( { refresh } ) => {

    const { appRefresh, setAppRefresh } = refresh;

    const [ categories, setCategories ] = useState( [] );
    const [ error, setError ] = useState( false );
    const [ isNew, setIsNew ] = useState( null );
    const [ isFetching, setIsFetching ] = useState( false );
    const [ modalArgs, setModalArgs ] = useState( null );
    const [ refreshComponent, setRefreshComponent ] = useState( false );

    /**
     * Fetch categories.
     */
    const handleFetchCategories = () => {
        if ( appRefresh ) {
            setAppRefresh( false );
        }

        setIsFetching( true );
        fetchCategories().then( resp => {
            setIsFetching( false );

            if ( ! resp ) {
                setError( `Something went wrong! Error: ${resp}` )
                return;
            }
            if ( ! _.isEmpty( resp ) ) {
                setCategories( resp );
            }
        } );
    };

    useEffect( handleFetchCategories, [ appRefresh ] );
    useEffect( () => {
        glCategories.list = categories;
    }, [ categories ] );

    return (
        <div className="tasks">
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">

                { isFetching ? (
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                ) : (
                    <>
                        { categories.map( ( category, index ) => (
                            <TaskList
                                key={ index }
                                category={ category }
                                categories={ { categories, setCategories } }
                                refreshComponent={ { refreshComponent, setRefreshComponent } }
                            />
                        ) ) }
                    </>
                ) }

                { isNew ? (
                    <NewCategory
                        categories={ { categories, setCategories } }
                        handles={ {
                            cancel: () => setIsNew( false )
                        } }
                    />
                ) : (
                    <div className="card card-compact glass h-min">
                        <div className="card-body">
                            <button
                                className="btn justify-start w-full"
                                onClick={ () => setIsNew( true ) }
                            >+ New list</button>
                        </div>
                    </div>
                ) }
            </div>

            <Modal
                { ...modalArgs }
                close={ () => setModalArgs( null ) }
            />
        </div>
    );
};

export default Tasks;
