import axios from 'axios'
import { useState } from 'react'

export const CreateQuiz = () => {
    const API_URL = "http://127.0.0.1:8000/quizhub/quiz/";
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateQuiz = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.access : null;

        axios.post(API_URL, {
            title,
            description,
        }, {
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${token}`
            }
        })
            .then(response => {
                console.log('Quiz created successfully:', response.data);
            })
            .catch(error => {
                console.error('Error creating quiz:', error);
            });
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
