import _ from "lodash";
import { useState, useEffect, Fragment } from "react";

import TaskCard from "./TaskCard";
import TaskEdit from "./TaskEdit";
import Button from "../Button";
import { fetchTasks, deleteTask, createTask, updateTask as updateTaskAPI } from "../../utils/tasks";

const TaskList = ( {
    category,
    handles,
    modal: {
        setModalArgs
    }
} ) => {

    const [ tasks, setTasks ] = useState( [] );
    const [ isFetching, setIsFetching ] = useState( false );
    const [ error, setError ] = useState( '' );
    const [ newTask, setNewTask ] = useState( null );
    const [ updateTask, setUpdateTask ] = useState( null );

    const { refresh: { setAppRefresh } } = handles;

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

    /**
     * Delete task by ID.
     *
     * @param {int} id 
     */
    const handleDeleteTask = ( id ) => {
        const message = 'Delete this task?';
        const onSuccess = () => {
            setIsFetching( true );
            deleteTask( id )
            .then( handleFetchTasks );
            setModalArgs( null );
        };

        setModalArgs( { message, onSuccess } );
    };

    // Initial fetch tasks.
    useEffect( handleFetchTasks, [] );

    // Save new task.
    if ( ! _.isEmpty( newTask?.title ) && newTask?.save ) {
        const { title, description = '' } = newTask;
        setIsFetching( true );
        setNewTask( null );
        createTask( {
            title,
            description,
            category: category.title
        } )
        .then( handleFetchTasks );
    }

    // Update task and call app refresh.
    if ( ! _.isEmpty( updateTask?.title ) && updateTask?.updated ) {
        updateTaskAPI( updateTask );
        setUpdateTask( null );
        setAppRefresh( true );
    }

    return (
        <div className="card card-compact bg-primary glass">

            <div className="card-body">
                <div className="card-title justify-between">
                    <h2>{ category.title }</h2>
                    <Button
                        onClick={ () => handles.delete( category.title ) }
                        type="cancel"
                    />
                </div>
                <div>
                    { isFetching ? (
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    ) : (
                        tasks.map( ( task ) => (
                            <Fragment key={ task.id }>
                                { ( updateTask?.id === task.id && updateTask?.edit ) ? (
                                    <TaskEdit
                                        task={ { task: updateTask, setTask: setUpdateTask } }
                                        handles={ {
                                            save: () => setUpdateTask( { ...updateTask, updated: true } ),
                                            cancel: () => setUpdateTask( null )
                                        } }
                                    />
                                ) : (
                                    <TaskCard
                                        task={ task }
                                        handles={ {
                                            edit: () => setUpdateTask( { ...task, edit: true, updated: false } ),
                                            delete: () => handleDeleteTask( task.id )
                                        } }
                                    />
                                ) }
                                <div className="mt-2"></div>
                            </Fragment>
                        ) )
                    ) }

                    { tasks.length > 0 && <div className="mt-4"></div> }

                    { ( newTask?.edit ) ? (
                        <TaskEdit
                            task={ { task: newTask, setTask: setNewTask } }
                            handles={ {
                                save: () => setNewTask( { ...newTask, save: true, edit: false } ),
                                cancel: () => setNewTask( { ...newTask, edit: false } )
                            } }
                            isNew="true"
                        />
                    ) : (
                        <Button
                            className="btn w-full justify-start"
                            onClick={ () => setNewTask( { ...newTask, edit: true } ) }
                        >+ Add card</Button>
                    ) }
                </div>
            </div>
        </div>
    );
};

export default TaskList;
