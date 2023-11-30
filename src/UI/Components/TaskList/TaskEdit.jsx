import _, { isArray, isEmpty, isFunction, isNull } from "lodash";
import { useState } from "react";
import globals from "../../../Data/globals";
import { createTask, updateTask as updateTaskAPI } from "../../../Data/tasks";
import Button from "../Button";
import Alert from "../Alert";

const TaskEdit = ( {
    tasks: {
        tasks,
        setTasks
    },
    task: taskData = null,
    categoryId = null,
    handles: {
        cancel
    },
    setRefreshComponent,
} ) => {

    const { categoryList } = globals;
    const isNew = ( isEmpty( taskData ) && ! isEmpty( categoryId ) );
    const [ task, setTask ] = useState( taskData?.data ? taskData.data : null );
    const [ error, setError ] = useState( false );
    const [ updating, setUpdating ] = useState( false );
    const taskId = taskData?.id ? taskData.id : null;

    if ( isNew && isEmpty( task ) ) {
        setTask( { category: categoryId } );
    }

    const updateTask = () => {
        let tempTasks = [];
        if ( taskData.category !== task.category ) {
            tempTasks = tasks.filter( tsk => tsk.id !== taskId );

            if ( isFunction( setRefreshComponent ) ) {
                setRefreshComponent( task.category );
            }
        } else {
            tempTasks = tasks.map( tsk => tsk.id !== taskId ? tsk : { ...tsk, data: task } );
        }
        setTasks( tempTasks );
        cancel();
    };

    const saveTask = ( resp ) => {
        setUpdating( false );
        setTasks( [ ...tasks, { id: resp.id, data: task } ] );
        cancel();
    };

    const handleError = ( e ) => {
        setError( 'Something went wrong.' );
        setUpdating( false );
        console.log(e);
    };

    const handleSave = () => {
        if ( isEmpty( task?.title ) ) {
            setError( 'Task must have a title' );
            return;
        }

        setUpdating( true );

        if ( isNew ) {
            const newTask = _.clone( task );
            setTask( newTask );
            createTask( newTask )
            .then( saveTask )
            .catch( handleError );
            return;
        }

        updateTaskAPI( taskId, _.clone( task ) )
        .then( updateTask )
        .catch( handleError );
    };

    const changeTitle = ( e ) => setTask( { ...task, title: e.target.value } );
    const changeDescription = ( e ) => setTask( { ...task, description: e.target.value } );
    const changeCategory = ( e ) => setTask( { ...task, category: e.target.value } );

    return (
        <>
            { ! isEmpty( error ) && <Alert text={ error } /> }

            <input
                type="text"
                placeholder="Enter title..."
                className="input w-full"
                value={ task?.title || '' }
                onChange={ changeTitle }
            />

            { ! isEmpty( task?.title ) && (
                <textarea
                    className="textarea w-full"
                    placeholder="Task description..."
                    value={ task?.description || '' }
                    onChange={ changeDescription }
                ></textarea>
            ) }

            { ( ! isNew && isArray( categoryList ) ) && (
                <>
                    { ( ! categoryList.length ) ? (
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    ) : (
                        <select
                            defaultValue={ task?.category || '' }
                            className="select select-bordered w-full max-w-xs"
                            onChange={ changeCategory }
                        >
                            { categoryList.map( ( { id, data: { title } }, index ) => (
                                <option key={ index } value={ id }>{ title }</option>
                            ) ) }
                        </select>
                    ) }
                </>
            ) }

            <div className="card-actions justify-end">
                <div className="join">
                    <Button
                        className="btn join-item btn-sm"
                        onClick={ handleSave }
                        disabled={ updating }
                    >Save</Button>
                    <Button
                        className="btn btn-square join-item btn-sm"
                        onClick={ cancel }
                        type="cancel"
                    />
                </div>
            </div>

        </>
    );
};

export default TaskEdit;
