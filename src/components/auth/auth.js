const isAuthenticated = () => {
    const password = localStorage.getItem('password_digest');
    return password !== null;
}

export default isAuthenticated;