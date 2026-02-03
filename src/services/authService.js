import api from './api';

export const authService = {
    async checkEmail(email) {
        const response = await api.post('/authenticate/check/email', { email });
        return response.data;
    },

    async checkPhone(phone) {
        const response = await api.post('/authenticate/check/phone', { phone });
        return response.data;
    },

    async signup(userData) {
        const response = await api.post('/authenticate/signup', userData);
        return response.data;
    },

    async preSignin(username) {
        const response = await api.post('/authenticate/pre/signin', { username });
        return response.data;
    },

    async signin(credentials) {
        const response = await api.post('/authenticate/signin', credentials);
        return response.data;
    },

    async checkToken() {
        const response = await api.post('/authenticate/check');
        return response.data;
    },

    async refreshToken() {
        const token = localStorage.getItem('refreshToken');
        const response = await api.post('/authenticate/refresh', { refreshToken: token });
        return response.data;
    },

    async signout() {
        const response = await api.post('/authenticate/signout');
        return response.data;
    }
};