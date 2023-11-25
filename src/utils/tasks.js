import axios from 'axios';
import _ from 'lodash';
import { apiBase, taskCategoryPath, taskPath } from './const';
import { getCurrentUserData } from './login';

const fetchTasks = async ( category = '' ) => {
    const currentUser = getCurrentUserData();
    const url = `${apiBase}${taskCategoryPath}${currentUser.user_id}?category=${category}`;
    const resp = await axios( url );

    if ( ! resp || ! resp.data || ! resp.data?.success ) {
        return false;
    }

    const tasks = [];
    resp.data.data.map( task => {
        tasks.push( {
            id: task.ID,
            title: task.post_title,
            description: task.post_content.replace( /(<([^>]+)>)/ig, '' ),
            category: task.task_category,
        } );
    } );

    return tasks;
};

const createTask = async ( task ) => {
    const currentUser = getCurrentUserData();

    const instance = axios.create( {
        baseURL: apiBase,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        }
    } );

    const resp = await instance.post( taskPath, {
        title: task.title,
        content: task.description,
        status: 'publish',
        author: currentUser.user_id,
        meta: {
            'task-category': task.category,
        }
    } );

    return resp;
};

const updateTask = async ( task ) => {
    const currentUser = getCurrentUserData();

    const instance = axios.create( {
        baseURL: apiBase,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        }
    } );

    const resp = await instance.post( taskPath + '/' + task.id, {
        title: task.title,
        content: task.description,
        meta: {
            'task-category': task.category,
        }
    } );

    return resp;
};

const deleteTask = async ( task_id ) => {
    const currentUser = getCurrentUserData();

    const instance = axios.create( {
        baseURL: apiBase,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        }
    } );

    const resp = await instance.delete( taskPath + '/' + task_id );

    return resp;
};

export { fetchTasks, createTask, updateTask, deleteTask };
