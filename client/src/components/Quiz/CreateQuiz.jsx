import axios from 'axios'
import { useState } from 'react'
import { updateToken } from '../../helpers/authService';
import { useNavigate } from 'react-router-dom';

export const CreateQuiz = () => {
    const API_URL = "http://127.0.0.1:8000/quizhub/quiz/";
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateTitle = (title) => {
        return title.length > 10 && title.length <= 150;
    };

    const validateDescription = (description) => {
        return description.length >= 60 && description.length <= 1000;
    };

    const handleCreateQuiz = async (e) => {
        e.preventDefault();
        setError('');


        try {

            if (!validateTitle(title)) {
                throw new Error('Title must be between 10 and 150 characters.');
            }

            if (!validateDescription(description)) {
                throw new Error('Description must be between 60 and 1000 characters.');
            }

            const token = updateToken();
            await axios.post(API_URL, { title, description }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                }
            });
            setTitle('')
            setDescription('')
            navigate('/quizzes/list');
        } catch (error) {
            const errorMessage = error.response?.data || error.message || "An error occurred during quiz creation";
            setError(errorMessage);
        }
    };
    return (
        <form onSubmit={handleCreateQuiz}>
            <div className="container py-4">
                <div className="card mx-auto rounded-3 shadow-lg">
                    <div className="card-header bg-dark rounded-top-4 rounded-bottom-5 text-light p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5>Create New Quiz</h5>
                            <button className="btn btn-success"><i className="fas fa-paper-plane"></i> Send</button>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="form-group mt-2">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" id="title" value={title} className="form-control" onChange={e => setTitle(e.target.value)} placeholder="Write your Quiz's title here" required />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea id="description" value={description} className="form-control" style={{ resize: "none", minHeight: "200px" }} onChange={e => setDescription(e.target.value)} placeholder='Describe your Quiz...' required />
                        </div>
                    </div>
                </div>
            </div >
        </form>
    )
}
