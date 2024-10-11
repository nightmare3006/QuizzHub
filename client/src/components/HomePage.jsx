import { Link } from "react-router-dom"


export const HomePage = () => {
  return (
    <div className="home-container d-flex w-100 h-100 p-5 mx-auto flex-column">
      <main className="px-3">
        <h1 className="text-center">Welcome to QuizHub!</h1>
        <p className="lead text-center">At QuizHub, we invite you to dive into a world of knowledge and fun. Here, you can not only create and publish your own quizzes but also challenge yourself by answering quizzes created by other users.</p>
        <div className="d-flex justify-content-center">
          <Link to="/register" className="btn btn-lg fw-bold btn-primary border-white text-white">Join Us</Link>
        </div>
      </main>

      <div className="container px-4 py-5" id="hanging-icons">
        <h2 className="pb-2 border-bottom">Features!</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-2">
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-primary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded-3" style={{ width: '50px', height: '50px' }}>
              <span style={{color: 'gold' }}>
              <i className="fa fa-trophy fa-solid" ></i>
              </span>
            </div>

            <div>
              <h3 className="fs-2 text-body-emphasis">Be a Winner!</h3>
              <p>Do you have what it takes to be the winner? Each quiz has its own owner who will decide which answer is the winning one. So, get ready to showcase your skills and learn something new every day!.</p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
          <div className="icon-square text-body-emphasis bg-primary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded-3" style={{ width: '50px', height: '50px' }}>
              <span style={{color: 'silver' }}>
              <i className="fa fa-users fa-solid" ></i>
              </span>
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Share, Learn, and Compete</h3>
              <p>Join our community, share your knowledge, and have fun while competing with other users. Let the adventure of knowledge begin!</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
