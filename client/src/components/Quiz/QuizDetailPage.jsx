import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useFetch } from '../../hooks/useFetch';
import { TextForm } from '../TextForm';
import { updateToken } from '../../helpers/authService';

export const QuizDetailPage = () => {
    const { quizId } = useParams();

    const APi_URL = `http://127.0.0.1:8000/quizhub/quiz/${quizId}`;
    const { data } = useFetch(APi_URL);
    const { title, description, owner, post_date } = data || {};
    const posted = post_date ? new Date(post_date).toISOString().slice(0, 10) : null;

    const AUTH_URL = `http://127.0.0.1:8000/auth/get-username/${owner}`; // Asegúrate que owner es quizId
    const user = useFetch(AUTH_URL);

    const [content, setContent] = useState('');

    const handlePost = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.access : updateToken();

        axios.post('http://127.0.0.1:8000/quizhub/solution/', {
            content,
            quiz: quizId
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `JWT ${token}`
                }
            })
            .then(response => {
                console.log('Solution posted:', response.data);
            })
            .catch(error => {
                console.error('Error posting solution:', error);
                console.error('Error details:', error.response?.data); // Esto te dará más detalles sobre el error
            });
    };

    return (
        <div className="container mt-4">
            <div className="card bg-light shadow-lg">
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="text-justify">{description}</p>
                    <p className="text-muted">Posted by {user.data?.username} on {posted}</p>
                    <hr />
                    <div className="d-flex justify-content-center">
                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                            <button className="btn btn-outline-primary"><i className="fas fa-eye"></i> View Solutions</button>
                            <button className="btn btn-outline-success"><i className="fas fa-trophy"></i> View Winner</button>
                            <button type="button" className="btn btn-outline-danger"><i className="fas fa-trash"></i> Delete Quiz</button>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-white bg-dark">
                    <TextForm content={content} setContent={setContent} handlePost={handlePost} />
                </div>
            </div>
        </div>
    );
};
