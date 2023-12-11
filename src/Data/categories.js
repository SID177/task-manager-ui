import { getAllRequest, insertOne } from "./db";

const tableName = 'categories';

const getCategories = async () => await getAllRequest( tableName );

const getCategory = async (id) => get(tableName, id);

const getCategoryRef = (id) => getRef(tableName, id);

const updateCategory = async (id, category) => await update(tableName, { id, data: category });

const createCategory = async (category) => await insertOne(tableName, category);

const deleteCategory = async (id) => await remove(tableName, id);

export { getCategories, getCategory, getCategoryRef, updateCategory, createCategory, deleteCategory };
