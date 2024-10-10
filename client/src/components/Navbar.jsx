import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
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
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="quizzes/my-quizzes">My Quizzes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="quizzes/solutions">My Solutions</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" href="#"></NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow align-middle">
              <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown"
                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              </a>
              <div className="dropdown-menu dropdown-menu-right animated--grow-in" aria-labelledby="userDropdown">
                <p className="dropdown-header fw-bold text-center text-dark"> Welcome</p>
                <hr/>
                  <a className="dropdown-item" href="{% url 'Profile' %}">
                    <i className="far fa-address-card fa-sm fa-fw mr-2 text-gray-400"></i>
                    Edit Account
                  </a>
                  <button type="button" className="btn dropdown-item" data-bs-toggle="modal"
                    data-bs-target="#staticBackdropLive">
                    <i className="fas fa-trash-can fa-sm fa-fw mr-2 text-gray-400"></i>
                    Delete Account
                  </button>
                  <a className="dropdown-item" href="#">
                    <i className="far fa-question-circle fa-sm fa-fw mr-2 text-gray-400"></i>
                    Help
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="{% url 'Logout' %}">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </a>
              </div>
            </li>

            <li className="nav-item ml-md-4">
              <Link className="nav-item btn btn-warning" id="Login"
                to="/login">Login</Link>
            </li>
            </ul>
        </div>
      </div>
    </nav>
  )
}
