import { useState } from "react";
import {register} from "../helpers/authService";
import { Link } from "react-router-dom";


export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    register(username, email, password)
    .then(response => {
      console.log(response.data);
    },
    error => {
      console.log(error.response.data);
    }
  );
};

  return (
    <div className="container py-3">
    <div className="card mx-auto rounded-5 shadow-lg" style={{ maxWidth: "400px" }}>
      <div className="card-header bg-dark rounded-top-4 rounded-bottom-5 text-light text-center">
        <h3>Login</h3>
        <p className="mb-1">To share your knowledge!</p>
      </div>
      <div className="card-body p-4">
        <form className="contact-form" onSubmit={handleRegister}>
          <div className="form-group mt-2">
          <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username" value={username} className="form-control"  onChange={e => setUsername(e.target.value)}/>
          </div>
          <div className="form-group mt-2">
          <label htmlFor="email" className="form-label">Username</label>
            <input type="text" id="email" value={email} className="form-control"  onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={password} id="password" className="form-control" onChange={ e => setPassword(e.target.value)} />

          </div>
          <hr />
          <div className="form-group mt-2">
            <button type="submit" className="btn btn-outline-primary btn-block form-control">Register</button>
          </div>
          <div className="form-group mt-2">
            <Link className="btn btn-outline-success btn-block form-control" to="/login">Login</Link><br />
          </div>
        </form>
      </div>
    </div>
  </div >
  )
}
