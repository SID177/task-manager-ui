import { isEmpty } from "lodash";
import { getCategoryRef } from "./categories";
import { add, get, getAll, remove, update } from "./db";

const tableName = 'Tasks';

const getTasks = async ( category = '' ) => {
    let query = null;
    if ( ! isEmpty( category ) ) {
        query = { category: getCategoryRef( category ) };
    }
    const result = await getAll( tableName, query );
    const tasks = {};
    Object.entries( result ).map( entry => {
        const task = { id: entry[0], data: entry[1] };
        task.data.category = task.data.category.id;
        tasks[ task.id ] = task.data;
    } );
    return tasks;
};

const getTask = async ( id = '' ) => {
    const task = await get( tableName, id );
    if ( ! isEmpty( task?.data?.category?.id ) ) {
        task.data.category = task.data.category.id;
    }
    return task;
};

const updateTask = async ( id, task ) => {
    if ( task.category ) {
        task.category = getCategoryRef( task.category );
    }
    return await update( tableName, { id, data: task } );
};

const createTask = async ( task ) => {
    if ( task.category ) {
        task.category = getCategoryRef( task.category );
    }
    return await add( tableName, task );
};

const deleteTask = async ( id ) => await remove( tableName, id );

export { getTasks, getTask, updateTask, createTask, deleteTask };
