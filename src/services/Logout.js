const logout = () => {
    localStorage.removeItem('authToken');
};

export default logout;
