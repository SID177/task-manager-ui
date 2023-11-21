import Button from '../../Components/Button';

const Task = ( { task, updateTask, deleteTask } ) => {

    const handleDeleteTask = () => {
        const confirm = window.confirm( 'Delete this task?' );
        if ( ! confirm ) {
            return;
        }

        deleteTask();
    };

    return (
        <div className="card card-compact glass">
            <div className="card-body">
                <div className="card-title justify-between">
                    <h2>{ task.title }</h2>
                    <div className="card-actions">
                        <Button
                            className="btn btn-square btn-xs"
                            onClick={ updateTask }
                            type="edit"
                        />
                        <Button
                            className="btn btn-square btn-xs"
                            onClick={ handleDeleteTask }
                            type="cancel"
                        />
                    </div>
                </div>
                <div>{ task.description }</div>
            </div>
        </div>
    );
};

export default Task;
