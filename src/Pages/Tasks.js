import { useState, useEffect } from 'react';
import _ from 'lodash';

import { saveCategories, fetchCategories } from '../utils/categories';
import TaskList from '../Components/TaskList';
import NewCategory from '../Components/NewCategory';

const Tasks = () => {

    const [ categories, setCategories ] = useState( [] );
    const [ error, setError ] = useState( false );
    const [ newCategory, setNewCategory ] = useState( {
        title: '',
        description: '',
        save: false
    } );
    const [ isFetchingCategories, setIsFetchingCategories ] = useState( false );
    const [ isSavingCategories, setIsSavingCategories ] = useState( false );

    const handleFetchCategories = () => {
        setIsFetchingCategories( true );
        fetchCategories().then( resp => {
            setIsFetchingCategories( false );

            if ( ! resp ) {
                setError( `Something went wrong! Error: ${resp}` )
                return;
            }
            if ( ! _.isEmpty( resp ) ) {
                setCategories( resp );
            }
        } );
    };

    const handleSaveCategories = ( cats ) => {
        setIsSavingCategories( true );
        saveCategories( cats ).then( () => setIsSavingCategories( false ) );
    };

    if ( newCategory.save ) {
        const newCategories = _.clone( categories );
        newCategories.push( {
            title: newCategory.title,
            description: newCategory.description
        } );

        setCategories( newCategories );
        setNewCategory( {
            title: '',
            description: '',
            save: false
        } );
        handleSaveCategories( newCategories );
    }

    const handleDeleteCategory = ( categoryTitle ) => {
        const newCategories = categories.filter( category => category.title !== categoryTitle );
        setCategories( newCategories );
        handleSaveCategories( newCategories );
    };

    useEffect( handleFetchCategories, [] );

    return (
        <div className="container tasks">
            <div className="tasks__container container grid grid-cols-3 gap-[10px]">

                { isFetchingCategories ? (
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                ) : (
                    categories.map( ( category, index ) => (
                        <TaskList key={ index } category={ category } deleteCategory={ handleDeleteCategory } />
                    ) )
                ) }

                <NewCategory newCategory={ newCategory } setNewCategory={ setNewCategory } />
            </div>
        </div>
    );
};

export default Tasks;