import axios from 'axios';

const API_URL = 'http://localhost:8000/auth/';

const register = (username, email, password) => {
    return axios.post(API_URL + 'register/', {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios.post(API_URL + 'login/', {
        username,
        password,
    }).then(response => {
        if (response.data.access) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
    return axios.post(API_URL + 'logout/');
};

const refreshToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const refresh = user ? user.refresh : null;

    return axios.post(API_URL + 'token/refresh/', {
        refresh,
    })
        .then(response => {
            if (response.data.access) {
                user.access = response.data.access;
                localStorage.setItem('user', JSON.stringify(user));
            }
            return response.data;
        })
        .catch(error => {
            console.error('Error refreshing token:', error);
            throw error;
        });
};

const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.access) {
        return false;
    }

    const token = user.access;
    const tokenParts = JSON.parse(atob(token.split('.')[1]));
    const now = Math.ceil(Date.now() / 1000);

    if (tokenParts.exp < now) {
        return refreshToken().then(() => true).catch(() => false);
    }

    return true;
};




export {
    register,
    login,
    logout,
    isAuthenticated,
};
