import _ from 'lodash';
import { apiBase, getCategoryPath, setCategoryPath } from './const';
import { get, post } from './common';
import { getCurrentUserData } from './login';

const fetchCategories = async () => {
    const currentUser = getCurrentUserData();
    const url = apiBase + getCategoryPath + `/${encodeURIComponent( currentUser.user_id )}`;
    const resp = await get( url );

    if ( _.isEmpty( resp?.data ) || ! resp.data.success ) {
        return false;
    }

    return resp.data.data;
};

const saveCategories = async ( categories ) => {
    const currentUser = getCurrentUserData();
    const url = apiBase + setCategoryPath + `/${encodeURIComponent( currentUser.user_id )}`;
    const resp = await post( url, { categories } );

    return resp.data;
};

export { saveCategories, fetchCategories };
