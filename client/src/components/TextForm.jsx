

export const TextForm = ({content, setContent, handlePost}) => {
    return (
        <>
            <h5 className="mt-3">Share your Ideas!</h5>
            <form onSubmit={handlePost}>
                <div className="form-group">
                    <div className="row mt-3 mb-2">
                        <div className="col-12 col-md-11">
                            <textarea value={content} className="form-control" style={{ border: "1px solid white", resize: "none", height: "100px" }} onChange={e => setContent(e.target.value) }  placeholder="write anithing you whant to share" required/> 
                        </div>
                        <div className="col-12 col-md-1 d-flex justify-content-center align-items-end mt-2 mt-md-0">

                            <button className="btn btn-light"><i className="fas fa-paper-plane"></i> Send</button>

                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
