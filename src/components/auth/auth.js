const isAuthenticated = () => {
    const password = localStorage.getItem('password_digest');
    if (password !== null) {
        return true;
    }
    return false;
}

export default isAuthenticated;