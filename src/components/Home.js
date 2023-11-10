import { useNavigate } from "react-router-dom";
import axios from "axios";
import Registration from "./auth/Registration";
import Login from "./auth/Login";

const Home = ({ loggedInStatus, handleLogin, handleLogout }) => {
    const navigate = useNavigate();
    const handleSuccessfulAuth = (data) => {
        // TODO update parent component
        handleLogin(data);
        navigate("/dashboard");
    }
    const handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response => {
            handleLogout();
        }).catch(error => {
            console.log("logout error", error);
        });
    }
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home page!</p>
            <h2>Status: {loggedInStatus}</h2>
            <button type="button" onClick={() => handleLogoutClick()}>Logout</button>
            <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
            <Login handleSuccessfulAuth={handleSuccessfulAuth} />
        </div>
    );
};
export default Home;