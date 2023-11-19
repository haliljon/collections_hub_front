const isGuest = () => {
    const role = localStorage.getItem('role')
    return role === 'guest';
}

export default isGuest;