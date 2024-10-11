import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../helpers/authService';
import { AuthContext } from '../context/AuthProvider';
import { useContext } from 'react';


export const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const location = useLocation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.username : null



  const handleLogout = () => {
    logout();
    const privateRoutes = [
      '/quizzes/quiz/my-quizzes',
      '/quizzes/solutions'
    ];

    // Redirecciona al home si la ruta actual es privada
    if (privateRoutes.includes(location.pathname)) {
      navigate('/');
    }

    setAuth(false);
  };


  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">QuizzHub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="quizzes/list">Quizzes</NavLink>
            </li>{auth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="quizzes/quiz/my-quizzes">My Quizzes</NavLink>
              </li>
            )}
            {auth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="quizzes/solutions">My Solutions</NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {!auth && (
              <li className="nav-item ml-md-4 me-3">
                <Link className="nav-item btn btn-success" id="Login"
                  to="/login">Login</Link>
              </li>)}
            {!auth && (
              <li className="nav-item ml-md-4 me-3">
                <Link className="nav-item btn btn-primary" id="Login"
                  to="/register">Register</Link>
              </li>)}
              {auth &&
              (<li className="nav-item ml-md-4 me-3 mt-2">
                <p className="text-white"
                >Welcome {username}</p>
              </li>)}
              {auth &&
              (<li className="nav-item ml-md-4 me-3">
                <button className="nav-item btn btn-primary" id="Login" onClick={handleLogout}
                ><i className='fas fa-sign-out-alt'></i> Logout</button>
              </li>)}
          </ul>
        </div>
      </div>
    </nav>
  )
}
