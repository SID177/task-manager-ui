import { collection, getDocs, doc, getDoc, query, where, setDoc, deleteDoc, addDoc } from "@firebase/firestore";
import { isEmpty, isString } from "lodash";
import { db } from "./_db";
import { getCurrentUser } from "./auth";

let currentUser = null;

const isValid = (type) => {
    currentUser = getCurrentUser();
    return (!isEmpty(type) && isString(type) && !isEmpty(currentUser));
};

const get = async (type = '', id = '') => {
    if (!isValid(type) || isEmpty(id)) {
        return false;
    }
    const docRef = doc(db, type, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        return null;
    }
    return { id: docSnap.id, data: docSnap.data() };
};

const getRef = (type = '', id = '') => {
    if (!isValid(type) || isEmpty(id)) {
        return;
    }
    const ref = doc(db, type.toLowerCase(), id);
    return ref;
};

const getAll = async (type = '', qry = null) => {
    if (!isValid(type) || isEmpty(currentUser)) {
        return false;
    }

    const userCond = where('userId', '==', currentUser.uid);

    let config = query(collection(db, type), userCond);
    if (!isEmpty(qry)) {
        const field = Object.keys(qry)[0];
        const value = Object.values(qry)[0];
        config = query(collection(db, type), where(field, '==', value), userCond);
    }

    const querySnapshot = await getDocs(config);
    const data = {};
    querySnapshot.forEach((doc) => (data[doc.id] = doc.data()));

    return data;
};

const update = async (type = '', data = null) => {
    if (!isValid(type) || isEmpty(data)) {
        return false;
    }
    data.data.userId = currentUser.uid;
    return await setDoc(doc(db, type, data.id), data.data);
};

const add = async (type = '', data = null) => {
    if (!isValid(type) || isEmpty(data)) {
        return false;
    }
    data.userId = currentUser.uid;
    return await addDoc(collection(db, type), data);
};

const remove = async (type = '', id = '') => {
    if (!isValid(type) || isEmpty(id)) {
        return false;
    }
    return await deleteDoc(doc(db, type, id));
};

export { getAll, get, getRef, update, db, add, remove };
