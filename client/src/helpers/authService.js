import axios from 'axios';

const API_URL = 'http://localhost:8000/auth/';

const register = (username, email, password) => {
    return axios.post(API_URL + 'register/', {
        username,
        email,
        password,
    });
};


const login = async (username, password) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/auth/login/', { username, password });
        const { access, refresh } = response.data;

        // Obtener el nombre de usuario
        const { user_id } = JSON.parse(atob(access.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        const userResponse = await axios.get(`http://127.0.0.1:8000/auth/get-username/${user_id}/`);

        // Guardar el token y el nombre de usuario en el localStorage
        localStorage.setItem('user', JSON.stringify({
            access,
            refresh,
            username: userResponse.data.username
        }));

        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
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

const updateToken = () => {
    refreshToken();
    const user = JSON.parse(localStorage.getItem('user'));
    return user.access;
}




export {
    register,
    login,
    logout,
    refreshToken,
    isAuthenticated,
    updateToken
};
