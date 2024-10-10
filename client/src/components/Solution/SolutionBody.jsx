import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import { updateToken } from "../../helpers/authService";


export const SolutionBody = ({quiz, content, id, owner, posted_at}) => {
  const API_URL = `http://127.0.0.1:8000/quizhub/quiz/${quiz}`;
  const USER_URL = `http://127.0.0.1:8000/auth/get-username/${owner}`;
  const { data: {username: user} } = useFetch(USER_URL);
  const { data: {title} } = useFetch(API_URL);
  const posted = posted_at.toString().slice(0,10);

  const handleDelete = () => {
    const token = updateToken();

    axios.delete(`http://127.0.0.1:8000/quizhub/solution/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `JWT ${token}`
      }
    });
  };

  return (
    <div className="bd-example m-0 border-0 rounded-3 w-100">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Answer to: {title}</h4>
          <p>{content}</p>
          <hr />
          <p className="text-muted">Posted by {user} on {posted}</p>
          <div className="d-flex justify-content-end">
            <button type="button" onClick={handleDelete} className="btn btn-danger"><i className="fas fa-trash" ></i> Delete Solution</button>
          </div>
        </div>
        
  </div>
  )
}
