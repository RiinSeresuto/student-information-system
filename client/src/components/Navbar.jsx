const Navbar = () => {
    const data = localStorage.getItem("role");
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");

    return (
        <nav className="navbar border-bottom color-primary px-5">
            <div className="container">
                <h5 className="m-0" id="navbar">
                    Welcome, you are viewing as {data}.
                </h5>
                <h5 className="m-0">
                    {firstName} {lastName}
                </h5>
            </div>
        </nav>
    );
};

export default Navbar;
