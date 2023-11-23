import axios from "axios";
import { Nav, Navbar } from "react-bootstrap";

import isAuthenticated from "./auth/auth";
import isAdmin from "./auth/isAdmin";
import isGuest from "./auth/isGuest";
import Search from "./Search";
import DarkModeToggle from "./DarkModeToggle";
import { useDarkMode } from "./DarkModeContext";
import RussianToggle from "./RussianToggle";
import { useLanguageRussian } from "./LanguageRussianContext";

const NavBar = ({ handleLogout }) => {
    const { isDarkMode } = useDarkMode()
    const isRussian = useLanguageRussian().isRussian
    const isNotLoggedIn = isGuest();
    const isLoggedin = isAuthenticated();
    const admin = isAdmin();
    const handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response => {
            handleLogout();
            const darkThemePreference = localStorage.getItem("dark-theme");
            localStorage.clear();
            localStorage.setItem('role', 'guest')
            localStorage.setItem("dark-theme", darkThemePreference);
        }).catch(error => {
            console.log("logout error", error);
        });
    }
    return (
        <Navbar
            bg={isDarkMode ? 'dark' : 'success'} variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="/">Collections Hub</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown">
                <Nav className="ms-auto">
                    <Nav.Item className="mx-2"><Search /></Nav.Item>
                    <Nav.Link href="/" className="mx-2 text-white">{isRussian ? 'Список всех коллекций' : 'List of all collections'}</Nav.Link>

                    {isNotLoggedIn && (<>
                        <Nav.Link href="/signin" className="mx-2 text-white">{isRussian ? 'Войти' : 'Sign in'}</Nav.Link>
                        <Nav.Link href="/signup" className="mx-2 text-white">{isRussian ? 'Зарегистрироваться' : 'Sign up'}</Nav.Link>
                    </>)}
                    {isLoggedin && (<>
                        <Nav.Link href="/my_collections" className="mx-2 text-white">{isRussian ? 'Мои коллекции' : 'My collections'}</Nav.Link>
                        {admin && (<>
                            <Nav.Link href="/all_users" className="mx-2 text-white">{isRussian ? 'Все пользователи' : 'All users'}</Nav.Link>
                        </>)}
                        <Nav.Link onClick={() => handleLogoutClick()} className="mx-2 text-white">{isRussian ? 'Выйти' : 'Logout'}</Nav.Link>
                    </>)}
                    <Nav.Item className="mx-2 mb-2">
                        <DarkModeToggle />
                    </Nav.Item>
                    <Nav.Item className="mx-2 "><RussianToggle /></Nav.Item>

                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}
export default NavBar;