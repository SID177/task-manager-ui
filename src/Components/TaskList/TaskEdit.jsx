import _, { isArray, isEmpty, isFunction, isNull } from "lodash";
import { useState } from "react";
import { categories } from "../../utils/const";
import { createTask, updateTask as updateTaskAPI } from "../../utils/tasks";
import Button from "../Button";
import Alert from "../Alert";

const TaskEdit = ( {
    tasks: {
        tasks,
        setTasks
    },
    task: taskData = null,
    category = null,
    handles: {
        cancel
    },
    setRefreshComponent,
} ) => {

    const { list: categoryList } = categories;
    const isNew = ( isEmpty( taskData ) && ! isEmpty( category ) );
    const [ task, setTask ] = useState( taskData );
    const [ error, setError ] = useState( false );
    const [ updating, setUpdating ] = useState( false );

    if ( isNew && isEmpty( task ) ) {
        setTask( { ...task, category } );
    }

    const updateTask = ( resp ) => {
        const tempTasks = [];
        tasks.forEach( newTask => {
            if ( newTask.id !== task.id ) {
                tempTasks.push( newTask );
                return;
            }

            newTask = { ...newTask, ...task };

            if ( newTask.category === taskData.category ) {
                tempTasks.push( newTask );
                return;
            }

            if ( isFunction( setRefreshComponent ) ) {
                setRefreshComponent( newTask.category );
            }
        } );
        setUpdating( false );
        setTasks( tempTasks );
        cancel();
    };

    const saveTask = ( resp ) => {
        setUpdating( false );
        setTasks( [ ...tasks, { ...task, id: resp.data.id } ] );
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
            createTask( task )
            .then( saveTask )
            .catch( handleError );
            return;
        }

        updateTaskAPI( task )
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
                            { categoryList.map( ( { title }, index ) => (
                                <option key={ index } value={ title }>{ title }</option>
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
