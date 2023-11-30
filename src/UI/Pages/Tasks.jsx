import { useState, useEffect } from 'react';
import _ from 'lodash';

import { getCategories } from '../../Data/categories';
import globals from '../../Data/globals';
import TaskList from '../Components/TaskList';
import NewCategory from '../Components/NewCategory';
import Modal from '../Components/Modal';

const Tasks = ({ refresh }) => {

    const { appRefresh, setAppRefresh } = refresh;

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [isNew, setIsNew] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [modalArgs, setModalArgs] = useState(null);
    const [refreshComponent, setRefreshComponent] = useState(false);

    /**
     * Fetch categories.
     */
    const handleFetchCategories = () => {
        if (appRefresh) {
            setAppRefresh(false);
        }

        setIsFetching(true);
        getCategories()
            .then(resp => {
                setIsFetching(false);
                const newCategories = [];
                Object.entries(resp).map(entry => newCategories.push({ id: entry[0], data: entry[1] }));
                setCategories(newCategories);
            });
    };

    useEffect(handleFetchCategories, [appRefresh]);
    useEffect(() => {
        globals.categoryList = categories;
    }, [categories]);

    return (
        <div className="tasks">
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">

                {isFetching ? (
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                ) : (
                    <>
                        {categories.map((category, index) => (

                            <TaskList
                                key={index}
                                category={category}
                                categories={{ categories, setCategories }}
                                refreshComponent={{ refreshComponent, setRefreshComponent }}
                            />
                        ))}
                    </>
                )}

                {isNew ? (
                    <NewCategory
                        categories={{ categories, setCategories }}
                        handles={{
                            cancel: () => setIsNew(false)
                        }}
                    />
                ) : (
                    <div className="card card-compact glass h-min">
                        <div className="card-body">
                            <button
                                className="btn justify-start w-full"
                                onClick={() => setIsNew(true)}
                            >+ New list</button>
                        </div>
                    </div>
                )}
            </div>

            <Modal
                {...modalArgs}
                close={() => setModalArgs(null)}
            />
        </div>
    );
};

export default Tasks;
