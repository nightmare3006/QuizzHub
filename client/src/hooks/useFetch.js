import { useEffect, useState } from "react";
import axios from "axios";
import { refreshToken, updateToken } from "../helpers/authService";

export const useFetch = (url) => {
    const [state, setState] = useState({ data: [], loading: true, errors: null, next: null, previous: null });
    useEffect(() => {
        setState({ data: [], loading: true, errors: null, next: null, previous: null });
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? updateToken() : null;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        if (token) {
            config.headers['Authorization'] = `JWT ${token}`;
        }

        axios.get(url, config )
        .then(response => {
            setState({
                loading: false,
                errors: null,
                data: response.data.results ?? response.data,
                next: response.data.next ?? null,
                previous: response.data.previous ?? null,
            });
        })
        .catch(error => {
            setState({
                loading: false,
                errors: error.message,
                data: [],
                next: null,
                previous: null,

            });
        });
}, [url]);

return state;
};
