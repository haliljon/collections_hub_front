import axios from "axios";
import isAuthenticated from "./auth/auth";
import isAdmin from "./auth/isAdmin";
import isGuest from "./auth/isGuest";

const Navbar = ({ handleLogout }) => {

    const isNotLoggedIn = isGuest();
    const isLoggedin = isAuthenticated();
    const admin = isAdmin();

    const handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response => {
            handleLogout();
            console.log('logout success', response);
            localStorage.clear();
            localStorage.setItem('role', 'guest')
        }).catch(error => {
            console.log("logout error", error);
        });
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-success p-3 fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Collections Hub</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto ">
                        <li className="nav-item">
                            <a className="nav-link mx-2 active" aria-current="page" href="/">List of all collections</a>
                        </li>
                        {isNotLoggedIn && (<>
                            <li className="nav-item">
                                <a className="nav-link mx-2" href="/signin">Sign in</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2" href="/signup">Sign up</a>
                            </li>
                        </>)}
                        {isLoggedin && (<>
                            <li className="nav-item">
                                <a className="nav-link mx-2" href="/my_collections">My collections</a>
                            </li>
                            {admin && (<>
                                <li className="nav-item">
                                    <a className="nav-link mx-2" href="/all_users">All users</a>
                                </li>
                            </>)}
                            <li className="nav-item">
                                <a className="nav-link mx-2" onClick={() => handleLogoutClick()}>Logout</a>
                            </li>
                        </>)}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;