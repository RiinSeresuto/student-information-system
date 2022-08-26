import "../styles/form.css"

const EditGrade = () =>{
    return(
        <div className="px-5 py-4 main-interface">
            <h2 className="color-primary">Edit Grade</h2>

            <div className="card p-4">
                <h4>Student S. Name</h4>

                <form>
                    <div className="form-floating">
                        <input type="number" name="new-grade" id="new-grade" className="form-control" placeholder="75"/>
                        <label htmlFor="new-grade">New Grade</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" name="password" id="password" className="form-control" placeholder="password" />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button className="btn btnSubmit mt-4">Save</button>
                </form>
            </div>
        </div>
    )
}

export default EditGrade;