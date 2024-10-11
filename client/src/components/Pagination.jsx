

export const Pagination = ({ next, previous, onPageChange }) => {

    return (
      <nav>
        <ul className="pagination pagination-lg justify-content-center">
          {previous && (
            <li className="page-item">
              <button className="btn btn-outline-primary" onClick={() => onPageChange(previous)}><i className="fas fa-lg fa-angle-double-left"></i></button>
            </li>
          )}
          {next && (
            <li className="page-item">
              <button className="btn btn-outline-primary" onClick={() => onPageChange(next)}><i className="fas fa-lg fa-angle-double-right"></i></button>
            </li>
          )}
        </ul>
      </nav>
    );
  };