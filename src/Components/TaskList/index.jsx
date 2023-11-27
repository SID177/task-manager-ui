import _, { isEmpty } from "lodash";
import { useState, useEffect, Fragment } from "react";

import Alert from "../Alert";
import TaskView from "./TaskView";
import TaskEdit from "./TaskEdit";
import Button from "../Button";
import { fetchTask, fetchTasks, updateTask } from "../../utils/tasks";
import { saveCategories } from "../../utils/categories";

const TaskList = ( {
    category,
    categories: {
        categories,
        setCategories
    },
    refreshComponent: {
        refreshComponent,
        setRefreshComponent
    }
} ) => {

    const [ tasks, setTasks ] = useState( [] );
    const [ isFetching, setIsFetching ] = useState( false );
    const [ error, setError ] = useState( '' );
    const [ isDelete, setIsDelete ] = useState( false );
    const [ confirmDelete, setConfirmDelete ] = useState( false );
    const [ isNew, setIsNew ] = useState( false );
    const [ dragEnterCategory, setDragEnterCategory ] = useState( '' );

    /**
     * Fetch tasks.
     */
    const handleFetchTasks = () => {
        setIsFetching( true );
        fetchTasks( category.title )
        .then( resp => {
            setIsFetching( false );
            if ( ! resp ) {
                setError( 'Something went wrong' );
                return;
            }
            if ( ! _.isEmpty( error ) ) {
                setError( '' );
            }
            setTasks( resp );
        } );
    };

    // Initial fetch tasks.
    useEffect( handleFetchTasks, [] );
    useEffect( () => {
        if ( category.title !== refreshComponent ) {
            return;
        }
        setRefreshComponent( false );
        handleFetchTasks();
    }, [ refreshComponent ] );

    if ( confirmDelete ) {
        setConfirmDelete( false );

        if ( tasks.length ) {
            setIsDelete( false );
            setError( 'Category list not empty.' );
            setTimeout( () => setError( '' ), 3000 );
            return;
        }

        setIsFetching( true );

        const newCategories = categories.filter( cat => cat.title !== category.title );
        saveCategories( newCategories )
        .then( resp => {
            setIsFetching( false );
            setCategories( newCategories );
        } )
        .catch( e => {
            setIsFetching( false );
            setError( 'Could not delete this category' );
        } );
    }

    const onDragStart = ( e, task ) => {
        e.dataTransfer.setData( 'id', task.id );
    };

    const onDrop = ( e, categoryTitle ) => {
        setDragEnterCategory( '' );

        const taskId = parseInt( e.dataTransfer.getData( 'id' ) );
        if ( ! taskId ) {
            return;
        }

        fetchTask( taskId )
        .then( task => {
            if ( task.category === categoryTitle ) {
                return;
            }

            setIsFetching( true );

            const oldCat = task.category;
            task.category = categoryTitle;

            updateTask( task )
            .then( () => {
                setIsFetching( false );
                const newTasks = [ ...tasks, task ];
                setTasks( newTasks );
                setRefreshComponent( oldCat );
            } )
            .catch( e => setIsFetching( false ) );
        } )
        .catch( e => setIsFetching( false ) );
    };

    const onDragOver = ( e ) => {
        e.preventDefault();
        setDragEnterCategory( category.title );
    };

    return (
        <div className={ `card card-compact ${category.title === dragEnterCategory ? 'bg-secondary' : 'bg-primary'} glass` }>

            <div
                className="card-body"
                onDrop={ ( e ) => onDrop( e, category.title ) }
                onDragOver={ onDragOver }
                onDragLeave={ ( e ) => setDragEnterCategory( '' ) }
            >

                <div className="card-title justify-between">
                    <h2>{ category.title }</h2>
                    <Button
                        onClick={ () => setIsDelete( ! isDelete ) }
                        type="cancel"
                    />
                </div>

                { ! isEmpty( error ) && <Alert text={ error } type="error" /> }

                { isDelete && (
                    <Alert
                        text={ `Delete ${category.title}?` }
                        type="warning"
                        className="mb-2"
                    >
                        <div className="join">
                            <Button
                                className="join-item btn btn-square btn-sm"
                                onClick={ () => setConfirmDelete( true ) }
                                disabled={ isFetching }
                                type="right"
                            />
                            <Button
                                onClick={ () => setIsDelete( false ) }
                                className="join-item btn btn-square btn-sm"
                                disabled={ isFetching }
                                type="cancel"
                            />
                        </div>
                    </Alert>
                ) }

                { isFetching ? (
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                ) : (
                    <>
                        { tasks.map( ( task, index ) => (
                            <Fragment key={ index }>
                                <div
                                    className="draggable cursor-grab"
                                    draggable
                                    onDragStart={ ( e ) => onDragStart( e, task ) }
                                >
                                    <TaskView
                                        task={ task }
                                        tasks={ { tasks, setTasks } }
                                        setRefreshComponent={ setRefreshComponent }
                                    />
                                </div>
                                <div className="mt-[1px]"></div>
                            </Fragment>
                        ) ) }
                    </>
                ) }

                { ( isNew ) ? (
                    <div className="card card-compact glass">
                        <div className="card-body">
                            <TaskEdit
                                tasks={ { tasks, setTasks } }
                                handles={ {
                                    cancel: () => setIsNew( false )
                                } }
                                category={ category.title }
                            />
                        </div>
                    </div>
                ) : (
                    <Button
                        className="btn w-full justify-start"
                        onClick={ () => setIsNew( true ) }
                    >+ Add card</Button>
                ) }
            </div>
        </div>
    );
};

export default TaskList;
