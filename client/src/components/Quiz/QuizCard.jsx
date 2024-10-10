import { Link } from "react-router-dom"


export const QuizCard = ({ id, title, post_date, owner, description }) => {
    const posted = post_date.toString().slice(0, 10)

    return (
        <div className="card text-center shadow" style={{maxWidth: "82%", minWidth: "350px"}}>
            <div className="card-header bg-dark text-light">
                <h5 className="card-title">{title}</h5>
            </div>
            <div className="card-body p-4">
                <p className="card-text text-justify">This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.This is some.</p>

                <p className="text-muted">Solutions: 0</p>
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <Link to="../quiz/detail/" className="btn btn-outline-primary"><i className="fas fa-eye"></i> View</Link>
                        <button type="button" className="btn btn-outline-danger"><i className="fas fa-trash"></i> Delete</button>
                    </div>
                    <p className="text-muted">Posted by {owner} on {posted}</p>
                </div>

            </div>
        </div>
    )
}
