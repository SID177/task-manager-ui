const apiBase = 'http://localhost:10018/wp-json/';
const tokenPath = 'jwt-auth/v1/token';
const getCategoryPath = 'task-manager/v1/task-category';
const setCategoryPath = 'task-manager/v1/task-category/set';
const taskPath = 'wp/v2/task';
const taskCategoryPath = 'task-manager/v1/tasks/';
const usersPath = 'wp/v2/users';
const categories = {
    list: []
};

export {
    apiBase,
    tokenPath,
    getCategoryPath,
    setCategoryPath,
    taskPath,
    taskCategoryPath,
    usersPath,
    categories
};
