const isGuest = () => {
    const role = localStorage.getItem('role')
    return role === 'guest' || role === null;
}

export default isGuest;