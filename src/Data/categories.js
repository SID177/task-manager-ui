import { add, get, getAll, getRef, remove, update } from "./db";

const tableName = 'Categories';

const getCategories = async () => await getAll( tableName );

const getCategory = async ( id ) => get( tableName, id );

const getCategoryRef = ( id ) => getRef( tableName, id );

const updateCategory = async ( id, category ) => await update( tableName, { id, data: category } );

const createCategory = async ( category ) => await add( tableName, category );

const deleteCategory = async ( id ) => await remove( tableName, id );

export { getCategories, getCategory, getCategoryRef, updateCategory, createCategory, deleteCategory };
