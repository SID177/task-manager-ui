import { useState } from 'react';
import { deleteTask } from '../../utils/tasks';
import Button from '../Button';
import TaskEdit from './TaskEdit';
import Alert from '../Alert';
import { isEmpty } from 'lodash';

const TaskView = ( {
    task,
    tasks,
    setRefreshComponent,
} ) => {

    const [ isDelete, setIsDelete ] = useState( false );
    const [ confirmDelete, setConfirmDelete ] = useState( false );
    const [ loading, setLoading ] = useState( false );
    const [ edit, setEdit ] = useState( false );
    const [ error, setError ] = useState( '' );
    const { title, description } = task;

    const handleDelete = ( resp ) => {
        const newTasks = tasks.tasks.filter( tk => tk.id !== task.id );
        tasks.setTasks( newTasks );
    };

    const handleError = ( e ) => {
        setLoading( false );
        setError( 'Something went wrong' );
    };

    if ( confirmDelete ) {
        setConfirmDelete( false );
        setLoading( true );

        deleteTask( task.id )
        .then( handleDelete )
        .catch( handleError );
    }

    return (
        <div className="card card-compact glass">
            { isDelete ? (
                <Alert
                    text={ `Delete ${task.title}?` }
                    type="error"
                >
                    <div className="join">
                        <Button
                            type="right"
                            className="join-item btn btn-square btn-sm"
                            disabled={ loading }
                            onClick={ () => setConfirmDelete( true ) }
                        />
                        <Button
                            type="cancel"
                            className="join-item btn btn-square btn-sm"
                            disabled={ loading }
                            onClick={ () => setIsDelete( false ) }
                        />
                    </div>
                </Alert>
            ) : (
                <div className="card-body">
                    { ! isEmpty( error ) && <Alert text={ error } type="error" /> }

                    { edit ? (
                        <TaskEdit
                            tasks={ tasks }
                            task={ task }
                            handles={ {
                                cancel: () => setEdit( false )
                            } }
                            setRefreshComponent={ setRefreshComponent }
                        />
                    ) : (
                        <>
                            <div className="card-title justify-between">
                                <h2>{ title }</h2>
                                <div className="card-actions">
                                    <Button
                                        className="btn btn-square btn-xs"
                                        onClick={ () => setEdit( true ) }
                                        type="edit"
                                    />
                                    <Button
                                        className="btn btn-square btn-xs"
                                        onClick={ () => setIsDelete( true ) }
                                        type="cancel"
                                    />
                                </div>
                            </div>
                            <div>{ description }</div>
                        </>
                    ) }
                </div>
            ) }
        </div>
    );
};

export default TaskView;
