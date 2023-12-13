import axios from "axios";
import { Nav, Navbar } from "react-bootstrap";
import { API_BASE_URL } from "./api";
import isAuthenticated from "./auth/auth";
import isAdmin from "./auth/isAdmin";
import isGuest from "./auth/isGuest";
import Search from "./Search";
import DarkModeToggle from "./DarkModeToggle";
import { useDarkMode } from "./DarkModeContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const NavigationBar = ({ handleLogout }) => {
    const { isDarkMode } = useDarkMode()
    const { t } = useTranslation()
    const isNotLoggedIn = isGuest();
    const isLoggedin = isAuthenticated();
    const admin = isAdmin();
    const handleLogoutClick = () => {
        axios.delete(`${API_BASE_URL}/logout`, { withCredentials: true }).then(response => {
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
                    <Nav.Link href="/" className="mx-2 text-white">{t('List of all collections')}</Nav.Link>

                    {isNotLoggedIn && (<>
                        <Nav.Link href="/signin" className="mx-2 text-white">{t('Sign in')}</Nav.Link>
                        <Nav.Link href="/signup" className="mx-2 text-white">{t('Sign up')}</Nav.Link>
                    </>)}
                    {isLoggedin && (<>
                        <Nav.Link href="/my_collections" className="mx-2 text-white">{t('My collections')}</Nav.Link>
                        {admin && (<>
                            <Nav.Link href="/all_users" className="mx-2 text-white">{t('All users')}</Nav.Link>
                        </>)}
                        <Nav.Link onClick={() => handleLogoutClick()} className="mx-2 text-white">{t('Logout')}</Nav.Link>
                    </>)}
                    <Nav.Item className="mx-2 "><LanguageSwitcher /></Nav.Item>
                    <Nav.Item className="mx-2 mb-2">
                        <DarkModeToggle />
                    </Nav.Item>

                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}
export default NavigationBar;