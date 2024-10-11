import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import { updateToken } from "../../helpers/authService";
import { useEffect, useState } from "react";
import { fetchWinner } from "../../helpers/fetchWinner";


export const SolutionBody = ({ quiz, content, id, owner, posted_at, setUpdate }) => {
  const API_URL = `http://127.0.0.1:8000/quizhub/quiz/${quiz}`;
  const USER_URL = `http://127.0.0.1:8000/auth/get-username/${owner}`;
  const { data: { username: user } } = useFetch(USER_URL);
  const { data: { title } } = useFetch(API_URL);
  const posted = posted_at ? posted_at.toString().slice(0, 10) : null;
  const [winner, setWinner] = useState(null);


  const handleDelete = () => {
    const token = updateToken();

    axios.delete(`http://127.0.0.1:8000/quizhub/solution/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }).then(() =>{
      setUpdate(prev => !prev);
    })
  };
  const handleSetAsWinner = () => {
    const token = updateToken();
    axios.post(`http://127.0.0.1:8000/quizhub/quiz/${quiz}/set-winner/`, {
      solution: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `JWT ${token}`
      }
    })
      .then(() => {
        setUpdate(prev => !prev);
      })
      .catch(error => {
        console.error('Error setting winner:', error);
      });
  };
  useEffect(() => {
  }, [winner]);

  useEffect(() => {

    const response = async () => {
      try {
        const data = await fetchWinner(quiz);
        if (data?.solution == id) {
          setWinner(true);
        }
        else {
          setWinner(false);
        }
      }
      catch (error) {
        console.error('Error fetching winner:', error);
        setWinner(null); // No winner found
      }
    }
    response();
  }, []);

  const isOwner = () => {
    const userLogged = JSON.parse(localStorage.getItem('user'));
    if (userLogged?.username == user) {
        return true;
    }
    else return false;
}

  const isQuizSolutionsView = location.pathname.includes(`/quiz/${quiz}/solutions`);

  return (
    <div className="bd-example m-0 border-0 rounded-3 w-100">
      <div className={`alert shadow ${winner ? 'alert-success' : 'alert-light'} `} role="alert">
        <div className="d-flex justify-content-between">
          <h4 className="alert-heading">Answer to: {title}</h4>
          {winner && (<span className="btn btn-warning text-white">
            <i className="fas fa-trophy"></i> Winner Solution!
          </span>)}
        </div>
        <p>{content}</p>
        <hr />
        <p className="text-muted">Posted by {user} on {posted}</p>
        <div className="d-flex justify-content-end">
          {isQuizSolutionsView && !winner && (
            <button type="button" onClick={handleSetAsWinner} className="btn btn-outline-success me-2"><i className="fas fa-trophy"></i> Set as Winner</button>
          )}
          {isOwner() && (
          <button type="button" onClick={handleDelete} className="btn btn-outline-danger me-2"><i className="fas fa-trash"></i> Delete Solution</button>
          )}
        </div>
      </div>
    </div>
  )
}
