import { TextForm } from "../TextForm"


export const QuizDetailPage = ({ id, title, description, owner, post_date }) => {
    // const posted = post_date.toString().slice(0,10)
    return (
        <div className="container mt-4">
            <div className="card bg-light shadow-lg">
                <div className="card-body">
                    <h4 className="card-title">Some title for a sample quiz card.</h4>
                    <p className="text-justify">This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of tex</p>
                    <p className="text-muted">Posted by  on </p>
                    <hr/>
                    <div className="d-flex justify-content-center">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button className="btn btn-outline-primary"><i className="fas fa-eye"></i> View Solutions</button>
                        <button className="btn btn-outline-success"><i className="fas fa-trophy"></i> View Winner</button>
                        <button type="button" className="btn btn-outline-danger"><i className="fas fa-trash"></i> Delete Quiz</button>
                    </div>
                    </div>
                </div>
                <div className="card-footer text-white bg-dark" >
                    <TextForm />
                </div>
            </div>
        </div>
    )
}
