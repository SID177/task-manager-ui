import { useState, useEffect } from 'react';
import _ from 'lodash';

import { categories as glCategories } from '../utils/const';
import { saveCategories, fetchCategories } from '../utils/categories';
import TaskList from '../Components/TaskList';
import NewCategory from '../Components/NewCategory';
import Modal from '../Components/Modal';
import { fetchTasks } from '../utils/tasks';

const Tasks = ( { refresh } ) => {

    const { appRefresh, setAppRefresh } = refresh;

    const [ categories, setCategories ] = useState( [] );
    const [ error, setError ] = useState( false );
    const [ newCategory, setNewCategory ] = useState( null );
    const [ isFetching, setIsFetching ] = useState( false );
    const [ modalArgs, setModalArgs ] = useState( null );

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
                glCategories.list = resp;
            }
        } );
    };

    /**
     * Save categories.
     *
     * @param {Array} cats Categories.
     */
    const handleSaveCategories = ( cats ) => saveCategories( cats );

    /**
     * Delete category.
     *
     * @param {string} categoryTitle Category title.
     */
    const handleDeleteCategory = async ( categoryTitle ) => {
        const message = 'Delete this category?';
        const onSuccess = async () => {
            const tasks = await fetchTasks( categoryTitle );
            if ( tasks.length ) {
                setModalArgs( {
                    message: 'Category list not empty. Please remove tasks first.',
                    isAlert: true
                } );
                return;
            }

            const newCategories = categories.filter( category => category.title !== categoryTitle );
            handleSaveCategories( newCategories );
            setCategories( newCategories );

            setModalArgs( {
                message: 'Category deleted successfully.',
                isAlert: true
            } );
        };

        setModalArgs( { message, onSuccess } );
    };

    // Save new category.
    if ( ! _.isEmpty( newCategory?.title ) && newCategory?.save ) {
        const category = {
            title: newCategory.title,
            description: newCategory?.description || ''
        };

        handleSaveCategories( [ ...categories, category ] );
        setCategories( [ ...categories, category ] );
        setNewCategory( null );
    }

    useEffect( handleFetchCategories, [ appRefresh ] );

    return (
        <div className="container tasks">
            <div className="tasks__container container grid grid-cols-3 gap-[10px]">

                { isFetching ? (
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                ) : (
                    categories.map( ( category, index ) => (
                        <TaskList
                            key={ index }
                            category={ category }
                            handles={ {
                                refresh,
                                delete: handleDeleteCategory
                            } }
                            modal={ { modalArgs, setModalArgs } }
                        />
                    ) )
                ) }

                <NewCategory
                    category={ {
                        category: newCategory,
                        setCategory: setNewCategory
                    } }
                />
            </div>

            <Modal
                { ...modalArgs }
                close={ () => setModalArgs( null ) }
            />
        </div>
    );
};

export default Tasks;
