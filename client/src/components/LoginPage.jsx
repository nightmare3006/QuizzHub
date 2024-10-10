import { useState } from "react"
import { Link } from "react-router-dom"
import {login} from "../helpers/authService";


export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password)
    .then(() => {
      console.log("first");
    }, 
    error =>{
      console.log(error.response.data);
    })
  }

  return (
    <div className="container py-4">
      <div className="card mx-auto rounded-5 shadow-lg" style={{ maxWidth: "400px" }}>
        <div className="card-header bg-dark rounded-top-4 rounded-bottom-5 text-light text-center">
          <h3>Login</h3>
          <p className="mb-1">To share your knowledge!</p>
        </div>
        <div className="card-body p-4">
          <form className="contact-form" onSubmit={handleLogin}>
            <div className="form-group mt-2">
            <label htmlFor="username" className="form-label">Username</label>
              <input type="text" id="username" value={username} className="form-control"  onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" value={password} id="password" className="form-control" onChange={ e => setPassword(e.target.value)} />

            </div>
            <hr />
            <div className="form-group mt-2">
              <button type="submit" className="btn btn-outline-success btn-block form-control">Login</button>
            </div>
            <div className="form-group mt-2">
              <Link className="btn btn-outline-primary btn-block form-control" to="/register">Register</Link><br />
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
