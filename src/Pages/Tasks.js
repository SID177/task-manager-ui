import { useState, useEffect } from 'react';
import _ from 'lodash';

import { categories as glCategories } from '../utils/const';
import { fetchCategories } from '../utils/categories';
import { fetchTasks, updateTask } from '../utils/tasks';
import TaskList from '../Components/TaskList';
import NewCategory from '../Components/NewCategory';
import Modal from '../Components/Modal';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

    const handleDragDrop = ( results ) => {
        const { destination, source, draggableId } = results;
        console.log(results);

        if ( ! destination || ! source ) {
            return;
        }

        const { droppableId } = destination;
        const { droppableId: sourceDroppableId } = source;

        const sourceCategory = sourceDroppableId.split( '-' )[0];
        const destinationCategory = droppableId.split( '-' )[0];
        const taskId = parseInt( draggableId.split( '-' )[0] );

        fetchTasks( sourceCategory )
        .then( resp => {
            const task = resp.find( tk => tk.id === taskId );
            if ( ! task ) {
                return;
            }
            if ( task.category !== destinationCategory ) {
                task.category = destinationCategory;
                console.log('new task');
                console.log(task);
                updateTask( task )
                .then( handleFetchCategories );
            }
        } );
    };

    useEffect( handleFetchCategories, [ appRefresh ] );
    useEffect( () => {
        glCategories.list = categories;
    }, [ categories ] );

    return (
        <div className="tasks">
            <div className="grid grid-cols-3 gap-[10px]">

                { isFetching ? (
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                ) : (
                    <DragDropContext onDragEnd={ handleDragDrop }>
                        { categories.map( ( category, index ) => (
                            <Droppable key={ index } droppableId={ category.title + '-drop' } type="group">
                                { ( provided ) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        <TaskList
                                            category={ category }
                                            categories={ { categories, setCategories } }
                                            refreshComponent={ { refreshComponent, setRefreshComponent } }
                                        />
                                        { provided.placeholder }
                                    </div>
                                ) }
                            </Droppable>
                        ) ) }
                    </DragDropContext>
                ) }

                { isNew ? (
                    <NewCategory
                        categories={ { categories, setCategories } }
                        handles={ {
                            cancel: () => setIsNew( false )
                        } }
                    />
                ) : (
                    <button
                        className="btn justify-start w-fit"
                        onClick={ () => setIsNew( true ) }
                    >+ New list</button>
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
