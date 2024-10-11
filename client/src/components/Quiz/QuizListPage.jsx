import { useEffect, useMemo, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Pagination } from "../Pagination";
import { QuizCard } from "./QuizCard";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const QuizListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const page = query.get("page") || 1;
  const [url, setUrl] = useState(`http://127.0.0.1:8000/quizhub/quiz/?page=${page}`);
  const { data, errors, loading, next, previous } = useFetch(url);
  const [update, setUpdate] = useState(false);


  const handlePageChange = (newUrl) => {
    const newPage = new URL(newUrl).searchParams.get("page");
    if (newPage) {
      navigate(`?page=${newPage}`);
      setUrl(newUrl + `&_=${new Date().getTime()}`); // Añadir timestamp para hacer única la URL
    } else {
      navigate(`?page=1`);
      setUrl(`http://127.0.0.1:8000/quizhub/quiz/?page=1&_=${new Date().getTime()}`); // Añadir timestamp para hacer única la URL
    }
  };

  useEffect(() => {
    const newPage = query.get("page") || 1;
    setUrl(`http://127.0.0.1:8000/quizhub/quiz/?page=${newPage}&_=${new Date().getTime()}`);
  }, [location.search, update]);

  useEffect(() => {
    if (!query.get("page")) {
      navigate(`?page=1`);
    }
  }, [navigate, query]);

  return (
    <>
      <div className="container shadow rounded-3 mt-4">
        <div className="d-flex justify-content-between align-items-center p-3">
          <h4><i className="fa-solid fa-lightbulb"></i> Quizzes</h4>
          <Link to="../quiz/create/" className="btn btn-outline-success"><i className="fas fa-plus"></i> Add New Quiz</Link>
        </div>
      </div>
      <div className="container shadow-lg rounded-3 mt-3 mb-3 p-3">
      {data.length === 0 && (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col text-center">
              <h1 className="display-1 text-muted" style={{ color: "rgba(0, 0, 0, 0.1)" }}>
                No Quizzes published yet.
              </h1>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="d-flex justify-content-center text-info">
          <div className="spinner-border" style={{ height: '4rem', width: '4rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row rows-cols-1 row-cols-md-2 g-3">
        {data.map(quiz => (
          <div className="col mb-3" key={quiz.id}>
            <div className="d-flex justify-content-center">
              <QuizCard {...quiz} setUpdate={setUpdate} />
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="pagination-container">
      <Pagination next={next} previous={previous} onPageChange={handlePageChange} />
    </div>
    </>
  );
};
