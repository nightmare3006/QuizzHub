import { Link } from "react-router-dom"
import { updateToken } from "../../helpers/authService";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";


export const QuizCard = ({ id, title, post_date, owner, description, setUpdate }) => {
    const USER_URL = `http://127.0.0.1:8000/auth/get-username/${owner}`;
    const { data: { username: user } } = useFetch(USER_URL);

    const posted = post_date.toString().slice(0, 10)

    const handleDelete = () => {
        const token = updateToken();

        axios.delete(`http://127.0.0.1:8000/quizhub/quiz/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${token}`
            }
        }).then(() => {setUpdate( prev => !prev)})
    };
    const isOwner = () => {
        const userLogged = JSON.parse(localStorage.getItem('user'));

        if (userLogged?.username == user) {
            return true;
        }
        else return false;
    }

    return (
        <div className="card text-center shadow" style={{ maxWidth: "82%", minWidth: "450px", minHeight: "250px" }}>
            <div className="card-header bg-dark text-light">
                <h5 className="card-title">{title}</h5>
            </div>
            <div className="card-body p-4">
                <p className="card-text text-justify">{description}</p>
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <Link to={`../quiz/detail/${id}`} className="btn btn-outline-primary"><i className="fas fa-eye"></i> View</Link>
                        {isOwner() && (<button type="button" onClick={handleDelete} className="btn btn-outline-danger"><i className="fas fa-trash"></i> Delete</button>)}
                    </div>
                    <p className="text-muted">Posted by {owner} on {posted}</p>
                </div>

            </div>
        </div>
    )
}
