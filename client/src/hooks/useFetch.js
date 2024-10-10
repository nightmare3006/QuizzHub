import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url) => {
    const [state, setState] = useState({ data: [], loading: true, errors: null, next: null, previous: null });

    useEffect(() => {
        setState({ data: [], loading: true, errors: null, next: null, previous: null });

        axios.get(url)
            .then(response => {
                setState({
                    loading: false,
                    errors: null,
                    data: response.data.results,
                    next: response.data.next,
                    previous: response.data.previous,
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
