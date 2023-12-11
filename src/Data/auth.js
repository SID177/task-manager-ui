import { loginEndpoint } from './_db';
import axios from 'axios';
import { isEmpty } from 'lodash';

const storageKey = 'login-user';
const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem(storageKey));
    } catch (e) {
        return false;
    }
};
const setStoredUser = (user) => localStorage.setItem(storageKey, JSON.stringify(user));
const deleteStoredUser = () => localStorage.removeItem(storageKey);

const getCurrentUser = () => getStoredUser();
const setCurrentUser = (user) => setStoredUser(user);

const login = async (user) => {
    try {
        const response = await axios.post(loginEndpoint, user);
        if (!isEmpty(response?.data)) {
            setCurrentUser(response.data);
            return response.data;
        }
    } catch (e) {
        if (!isEmpty(e?.response?.data?.error) && 'invalid username/password' === e?.response?.data?.error) {
            return {
                error: true,
                message: 'Invalid username or password',
            }
        }
    }
    return null;
};

const logout = () => {
    deleteStoredUser();
};

export { getCurrentUser, login, logout, setCurrentUser };
