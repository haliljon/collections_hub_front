const isAdmin = () => {
    const role = localStorage.getItem('role')
    return role === 'admin';
}

export default isAdmin;