import { useState } from "react";
import { useFetch } from "../../hooks/useFetch"
import { Pagination } from "../Pagination"
import { QuizCard } from "./QuizCard"
import { Link } from "react-router-dom";


export const QuizListPage = () => {
  const [url, setUrl] = useState(() => {
    return localStorage.getItem('currentPageUrl') || `http://127.0.0.1:8000/quizhub/quiz/?page=1`;
  });
  const { data, errors, loading, next, previous } = useFetch(url);

  const handlePageChange = (newUrl) => {
    localStorage.setItem('currentPageUrl', newUrl);
    setUrl(newUrl);
  };

  console.log(data, errors);

  return (
    <>
      <div className="container shadow rounded-3 mt-4">
        <div className="d-flex justify-content-between align-items-center p-3">
          <h4><i className="fa-solid fa-lightbulb"></i> Quizzes</h4>
          <Link to="../quiz/create/" className="btn btn-outline-success"><i className="fas fa-plus"></i> Add New Quiz</Link>
        </div>
      </div>
      <div className="container shadow-lg rounded-3 mt-5 mb-3">
        {loading && (
          <div className="d-flex justify-content-center text-info">
            <div className="spinner-border" style={{ height: '4rem', width: '4rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className="row rows-cols-1 row-cols-md-2 g-3">
          {data.map(quiz => {
            return (
              <div className="col mb-3 " key={quiz.id}>
                <div className="d-flex justify-content-center">
                  <QuizCard  {...quiz} />
                </div>

              </div>
            )
          })}
        </div>
      </div>
      <div className="pagination-container">
        <Pagination next={next} previous={previous} onPageChange={handlePageChange} />
      </div>
    </>
  )
}
