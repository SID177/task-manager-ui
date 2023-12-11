import { isArray, isEmpty, isString } from "lodash";
import { apiEndpoint, dataSource, database } from "./_db";
import { getCurrentUser } from "./auth";
import axios from "axios";

let currentUser = null;

const isValid = () => {
    currentUser = getCurrentUser();
    return !isEmpty(currentUser) && !isEmpty(currentUser.access_token);
};

const getHeaders = () => ({
    'Authorization': `Bearer ${currentUser.access_token}`
});

const get = async ( url, collection, filter = null, output = null ) => {
    if ( ! isValid() ) {
        return false;
    }

    const headers = getHeaders();
    const data = {
        collection,
        database,
        dataSource,
    };
    if ( output ) {
        data.projection = output;
    }
    if ( filter ) {
        data.filter = filter;
    } else {
        data.filter = { user_id: currentUser.user_id };
    }

    let response = null;
    try {
        response = await axios.post( url, data, { headers } );
        if ( resp && 200 === resp?.status && isArray( resp?.data?.documents ) ) {
            return response.data.documents;
        }
    } catch ( e ) {
        return {
            error: true
        }
    }
    return null;
};

const getOneRequest = async (collection, output = null) => {
    return await get( apiEndpoint + 'findOne', collection, output );
};

const getAllRequest = async ( collection, output = null ) => {
    return await get( apiEndpoint + 'find', collection, output );
};

const insertOne = async ( collection, document ) => {
    if ( ! isValid() ) {
        return false;
    }

    if ( document ) {
        document.user_id = currentUser.user_id;
    }
    const data = {
        collection,
        database,
        dataSource,
        document
    };

    let response = null;
    try {
        response = await axios.post( apiEndpoint + 'insertOne', data, { headers: getHeaders() } );
        if ( response && 201 === response.status && ! isEmpty( response?.data?.insertedId ) ) {
            return response.data.insertedId;
        }
    } catch ( e ) {
        return {
            error: true,
        };
    }

    return null;
};

export { getOneRequest, getAllRequest, insertOne };
