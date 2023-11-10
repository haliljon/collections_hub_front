const Dashboard = ({ loggedInStatus }) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the Dashboard page!</p>
            <h2>Status: {loggedInStatus}</h2>
        </div>
    );
}
export default Dashboard;