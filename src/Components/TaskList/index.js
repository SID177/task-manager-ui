import _ from "lodash";
import { useState, useEffect, Fragment } from "react";
import Task from "./Task";
import TaskCard from "./TaskCard";
import Button from "../Button";
import { fetchTasks, deleteTask, createTask, updateTask as updateTaskAPI } from "../../utils/tasks";

const TaskList = ( { category, deleteCategory } ) => {
    const newObj = {
        title: '',
        description: '',
        save: false,
        edit: false,
    };
    const updateObj = {
        id: 0,
        title: '',
        description: '',
        category: '',
        updated: false,
        edit: false,
    };

    const [ tasks, setTasks ] = useState( [] );
    const [ isFetching, setIsFetching ] = useState( false );
    const [ error, setError ] = useState( '' );
    const [ newTask, setNewTask ] = useState( { ...newObj } );
    const [ updateTask, setUpdateTask ] = useState( { ...updateObj } );

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

    useEffect( handleFetchTasks, [] );

    const resetUpdate = () => {
        setUpdateTask( { ...updateObj } );
    };

    if ( newTask.save && ! _.isEmpty( newTask.title ) ) {
        const { title, description } = newTask;
        setNewTask( { ...newObj } );
        createTask( {
            title,
            description,
            category: category.title
        } )
        .then( handleFetchTasks );
    }

    if ( updateTask.updated && ! _.isEmpty( updateTask.title ) ) {
        resetUpdate();
        updateTaskAPI( updateTask )
        .then( handleFetchTasks );
    }

    return (
        <div className="card card-compact bg-primary glass">
            <div className="card-body">
                <div className="card-title justify-between">
                    <h2>{ category.title }</h2>
                    <Button
                        onClick={ () => deleteCategory( category.title ) }
                        type="cancel"
                    />
                </div>
                <div className="divider mt-0"></div>
                <div>
                    { isFetching ? (
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    ) : (
                        tasks.map( ( task ) => (
                            <Fragment key={ task.id }>
                                { ( updateTask.id === task.id && updateTask.edit ) ? (
                                    <TaskCard
                                        task={ updateTask }
                                        setTask={ setUpdateTask }
                                        handleSave={ () => setUpdateTask( { ...updateTask, updated: true } ) }
                                        handleCancel={ resetUpdate }
                                    />
                                ) : (
                                    <Task
                                        task={ task }
                                        updateTask={ () => setUpdateTask( { id: task.id, title: task.title, description: task.description, category: task.category, edit: true } ) }
                                        deleteTask={ () => deleteTask( task.id ).then( () => handleFetchTasks() ) }
                                    />
                                ) }
                                <div className="m-4"></div>
                            </Fragment>
                        ) )
                    ) }

                    { tasks.length > 0 && <div className="divider"></div> }

                    { newTask.edit ? (
                        <TaskCard
                            task={ newTask }
                            setTask={ setNewTask }
                            handleSave={ () => setNewTask( { ...newTask, save: true, edit: false } ) }
                            handleCancel={ () => setNewTask( { ...newTask, edit: false } ) }
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
