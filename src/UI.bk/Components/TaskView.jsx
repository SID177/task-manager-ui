import { isEmpty } from 'lodash';
import { useState } from 'react';


import TaskEdit from './TaskEdit';
import Alert from './Alert';
import Button from './Button';

import { deleteTask } from '../../Data/tasks';

const TaskView = ({
    task,
    tasks,
    setRefreshComponent,
}) => {

    const [isDelete, setIsDelete] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState('');
    const { id: taskId, data: { title, description } } = task;

    const reset = () => {
        setLoading(false);
        setIsDelete(false);
        setError('');
    };

    const handleDelete = (resp) => {
        const newTasks = tasks.tasks.filter(tk => tk.id !== taskId);
        tasks.setTasks(newTasks);
        reset();
    };

    const handleError = (e) => {
        reset();
        setError('Something went wrong');
    };

    if (confirmDelete) {
        setConfirmDelete(false);
        setLoading(true);

        deleteTask(taskId)
            .then(handleDelete)
            .catch(handleError);
    }

    return (
        <div className={`card card-compact ${edit ? 'bg-secondary' : 'bg-primary'} glass`}>
            {isDelete ? (
                <Alert
                    text={`Delete ${title}?`}
                    type="error"
                    className="bg-error glass border-0 hover:border-error"
                >
                    <div className="join">
                        <Button
                            type="right"
                            className="join-item btn-sm btn-square hover:text-white"
                            disabled={loading}
                            onClick={() => setConfirmDelete(true)}
                        />
                        <Button
                            type="cancel"
                            className="join-item btn-sm btn-square hover:text-white"
                            disabled={loading}
                            onClick={() => setIsDelete(false)}
                        />
                    </div>
                </Alert>
            ) : (
                <div className="card-body">
                    {!isEmpty(error) && <Alert text={error} type="error" />}

                    {edit ? (
                        <TaskEdit
                            tasks={tasks}
                            task={task}
                            handles={{
                                cancel: () => setEdit(false)
                            }}
                            setRefreshComponent={setRefreshComponent}
                        />
                    ) : (
                        <>
                            <div className="card-title justify-between">
                                <h2>{title}</h2>
                                <div className="card-actions">
                                    <Button
                                        className="btn-square btn-xs hover:text-white"
                                        onClick={() => setEdit(true)}
                                        type="edit"
                                    />
                                    <Button
                                        className="btn-square btn-xs hover:text-white"
                                        onClick={() => setIsDelete(true)}
                                        type="cancel"
                                    />
                                </div>
                            </div>
                            <div className="overflow-auto max-h-64">{description}</div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskView;
