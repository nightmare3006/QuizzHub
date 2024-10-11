import { SolutionBody } from "./SolutionBody"
import { useEffect, useMemo, useState } from "react";
import { useFetch } from "../../hooks/useFetch"
import { Pagination } from "../Pagination"
import { useLocation, useNavigate } from "react-router-dom";

export const SolutionListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const page = query.get("page") || 1;
  const [url, setUrl] = useState(`http://127.0.0.1:8000/auth/my-solutions/?page=${page}`);
  const { data, errors, loading, next, previous } = useFetch(url);
  const [update, setUpdate] = useState(false);


  const handlePageChange = (newUrl) => {
    const newPage = new URL(newUrl).searchParams.get("page");
    if (newPage) {
      navigate(`?page=${newPage}`);
      setUrl(newUrl);
    } else {
      navigate(`?page=1`);
      setUrl(`http://127.0.0.1:8000/auth/my-solutions/?page=1`);
    }
  };

  useEffect(() => {
    const newPage = query.get("page") || 1;
    setUrl(`http://127.0.0.1:8000/auth/my-solutions/?page=${newPage}&_=${new Date().getTime()}`);
  }, [location.search,update]);

  useEffect(() => {
    if (!query.get("page")) {
      navigate(`?page=1`);
    }
  }, [navigate, query]);



  return (
    <>
      <div className="container shadow-lg rounded-3 mt-5 mb-3 p-3">
        {data.length == 0 && (
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col text-center">
                <h1 className="display-1 text-muted" style={{ color: "rgba(0, 0, 0, 0.1)" }}>
                  No Solutions published yet.
                </h1>
              </div>
            </div>
          </div>)}
        {loading && (
          <div className="d-flex justify-content-center text-info">
            <div className="spinner-border" style={{ height: '4rem', width: '4rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {data.map(solution => (
          <div className="d-flex justify-content-center" key={solution.id}>
            <SolutionBody {...solution} setUpdate={setUpdate} />
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination next={next} previous={previous} onPageChange={handlePageChange} />
      </div>
    </>
  );
};
