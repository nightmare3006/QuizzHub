import { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFetch } from '../../hooks/useFetch';
import { TextForm } from '../TextForm';
import { updateToken } from '../../helpers/authService';
import { fetchWinner } from '../../helpers/fetchWinner';
import { AuthContext } from '../../context/AuthProvider';
import { SolutionBody } from '../Solution/SolutionBody';

export const QuizDetailPage = () => {
    const { quizId } = useParams();

    const APi_URL = `http://127.0.0.1:8000/quizhub/quiz/${quizId}`;
    const { data } = useFetch(APi_URL);
    const { title, description, owner, post_date } = data || {};
    const posted = post_date ? new Date(post_date).toISOString().slice(0, 10) : null;

    const AUTH_URL = `http://127.0.0.1:8000/auth/get-username/${owner}`;
    const { data: user } = useFetch(AUTH_URL);
    const [content, setContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [winner, setWinner] = useState(null);
    const [error, setError] = useState('');


    const SOLUTION_URL = `http://127.0.0.1:8000/quizhub/solution/${winner?.solution}`
    const solution = useFetch(SOLUTION_URL)
    console.log(winner?.solution, solution)
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate()

    const validateContent = (content) => {
        return content.length <= 500;
    };

    const handlePost = (e) => {
        e.preventDefault();
        try {
            if (!validateContent(content)) {
                throw new Error('Solution must be less than 500 characters')
            }

            const token = updateToken();

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
                    console.error('Error details:', error.response?.data);
                });
            setContent('')
            navigate('/quizzes/list');
        } catch (error) {
            const errorMessage = error.response?.data || error.message || "An error occurred during quiz creation";
            setError(errorMessage)
        }
    };

    const handleFetchWinner = async () => {
        try {
            const response = await fetchWinner(quizId);
            console.log(response)
            setWinner(response);
        } catch (error) {
            console.error('Error fetching winner:', error);
            setWinner(null); // No winner found
        } finally {
            setShowModal(true);
        }
    };
    const isOwner = () => {
        const userLogged = JSON.parse(localStorage.getItem('user'));
        if (userLogged?.username == user.username) {
            return true;
        }
        else return false;
    }

    return (
        <div className="container mt-4">
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div className="card bg-light shadow-lg">
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="text-justify">{description}</p>
                    <p className="text-muted">Posted by {user.data?.username} on {posted}</p>
                    <hr />
                    <div className="d-flex justify-content-center">
                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                            {auth && isOwner() && (<Link to={`../quiz/${quizId}/solutions`} className="btn btn-outline-primary"><i className="fas fa-eye"></i> View Solutions</Link>)}
                            <button className="btn btn-outline-success" onClick={handleFetchWinner}><i className="fas fa-trophy"></i> View Winner</button>
                            {auth && isOwner() && (<button type="button" className="btn btn-outline-danger"><i className="fas fa-trash"></i> Delete Quiz</button>)}
                        </div>
                    </div>
                </div>
                {auth && !isOwner() && (
                    <div className="card-footer text-white bg-dark">
                        <TextForm content={content} setContent={setContent} handlePost={handlePost} />
                    </div>)}
            </div>
            {/* Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} aria-modal="true" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-dark">
                                <h5 className="modal-title text-white">Winner</h5>
                            </div>
                            <div className="modal-body">
                                {winner ? (
                                    <div>
                                        <SolutionBody {...solution.data} />
                                    </div>
                                ) : (
                                    <p>No winner found.</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
