import { useState, useEffect, Fragment } from "react";
import { isEmpty } from "lodash";

import Button from "./Button";
import TaskView from "./TaskView";
import TaskEdit from "./TaskEdit";
import Alert from "./Alert";

import { getTasks, getTask, updateTask } from "../../Data/tasks";
import { deleteCategory } from "../../Data/categories";

/**
 * @param {Object} props
 * @returns JSX
 */
const Category = ({
    category: {
        id: categoryId,
        data: category
    },
    categories: {
        categories,
        setCategories
    },
    refreshComponent: {
        refreshComponent,
        setRefreshComponent
    }
}) => {

    const [tasks, setTasks] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');
    const [isDelete, setIsDelete] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [dragEnterCategory, setDragEnterCategory] = useState('');

    /**
     * Fetch tasks.
     */
    const handleFetchTasks = () => {
        setIsFetching(true);

        getTasks(categoryId)
            .then(resp => {
                setIsFetching(false);

                const newTasks = [];
                Object.entries(resp)
                    .map(entry => newTasks.push({ id: entry[0], data: entry[1] }));

                setTasks(newTasks);
            });
    };

    // Initial fetch tasks.
    useEffect(handleFetchTasks, []);

    useEffect(() => {
        if (categoryId !== refreshComponent) {
            return;
        }
        setRefreshComponent(false);
        handleFetchTasks();
    }, [refreshComponent]);

    if (confirmDelete) {
        setConfirmDelete(false);

        if (tasks.length) {
            setIsDelete(false);
            setError('Category list not empty.');
            setTimeout(() => setError(''), 3000);
            return;
        }

        deleteCategory(categoryId)
            .then(resp => setCategories(categories.filter(cat => cat.id !== categoryId)))
            .catch(e => {
                setError('Could not delete this category');
                console.log(e);
            });
    }

    const onDragStart = (e, task) => {
        e.dataTransfer.setData('id', task.id);
        e.dataTransfer.setData('cat', task.data.category);
    };

    const onDrop = (e, catId) => {
        setDragEnterCategory('');

        const taskId = e.dataTransfer.getData('id');
        const cat = e.dataTransfer.getData('cat');
        if (!taskId) {
            return;
        }

        if (cat === catId) {
            return;
        }

        setIsFetching(true);
        getTask(taskId)
            .then(({ id, data }) => {
                const oldCat = data.category;
                data.category = catId;

                updateTask(id, data)
                    .then(() => {
                        setIsFetching(false);
                        setTasks([...tasks, { id, data }]);
                        setRefreshComponent(oldCat);
                    })
                    .catch(e => {
                        console.log(e);
                        setIsFetching(false);
                        setError('Something went wrong');
                    });
            })
            .catch(e => {
                console.log(e);
                setError('Something went wrong');
            });
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setDragEnterCategory(categoryId);
    };

    return (
        <div className={`category ${categoryId === dragEnterCategory ? 'bg-secondary' : 'bg-primary'} card card-compact glass`}>

            <div
                className="card-body"
                onDrop={(e) => onDrop(e, categoryId)}
                onDragOver={onDragOver}
                onDragLeave={(e) => setDragEnterCategory('')}
            >

                <div className="card-title justify-between">
                    <h2>{category.title}</h2>
                    <Button
                        onClick={() => setIsDelete(!isDelete)}
                        type="cancel"
                    />
                </div>

                {!isEmpty(error) && <Alert text={error} type="error" />}

                {isDelete && (
                    <Alert
                        text={`Delete ${category.title}?`}
                        type="warning"
                        className="mb-2"
                    >
                        <div className="join">
                            <Button
                                className="join-item btn btn-square btn-sm"
                                onClick={() => setConfirmDelete(true)}
                                disabled={isFetching}
                                type="right"
                            />
                            <Button
                                onClick={() => setIsDelete(false)}
                                className="join-item btn btn-square btn-sm"
                                disabled={isFetching}
                                type="cancel"
                            />
                        </div>
                    </Alert>
                )}

                {isFetching ? (
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                ) : (
                    <>
                        {tasks.map((task, index) => (
                            <Fragment key={index}>
                                <div
                                    className="draggable cursor-grab"
                                    draggable
                                    onDragStart={(e) => onDragStart(e, task)}
                                >
                                    <TaskView
                                        task={task}
                                        tasks={{ tasks, setTasks }}
                                        setRefreshComponent={setRefreshComponent}
                                    />
                                </div>
                                <div className="mt-[1px]"></div>
                            </Fragment>
                        ))}
                    </>
                )}

                {(isNew) ? (
                    <div className="card card-compact glass">
                        <div className="card-body">
                            <TaskEdit
                                tasks={{ tasks, setTasks }}
                                handles={{
                                    cancel: () => setIsNew(false)
                                }}
                                categoryId={categoryId}
                            />
                        </div>
                    </div>
                ) : (
                    <Button
                        className="btn w-full justify-start"
                        onClick={() => setIsNew(true)}
                    >+ Add card</Button>
                )}
            </div>
        </div>
    );
};

export default Category;
