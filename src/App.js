import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import AllUsers from './pages/AllUsers';
import MyCollections from './pages/MyCollections';
import EachCollection from './pages/EachCollection';
import AddItem from './pages/AddNewItem';
import AddCollection from './pages/AddCollection';
import { fetchUsers } from './store/users';
import { fetchCollections } from './store/collections';
import { fetchItems } from './store/items';
import { fetchComments } from './store/comments';
import { fetchLikes } from './store/likes';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import { fetchTags } from './store/tags';
import SearchResult from './pages/searchResult';
import NavigationBar from './components/NavigationBar';
import { API_BASE_URL } from './components/api';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
  const [user, setUser] = useState({});
  const handleLogin = (data) => {
    setLoggedInStatus('LOGGED_IN');
    setUser(data.user);
  };
  console.log('user', user);
  const checkLoginStatus = () => {
    axios.get(`${API_BASE_URL}/logged_in`, { withCredentials: true }).then((response) => {
      if (response.data.logged_in && loggedInStatus === 'NOT_LOGGED_IN') {
        setLoggedInStatus('LOGGED_IN');
        setUser(response.data.user);
      } else if (!response.data.logged_in && loggedInStatus === 'LOGGED_IN') {
        setLoggedInStatus('NOT_LOGGED_IN');
        setUser({});
      }
    }).catch((error) => {
      console.log('check login error', error);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchUsers());
        dispatch(fetchCollections());
        dispatch(fetchItems());
        dispatch(fetchComments());
        dispatch(fetchLikes());
        dispatch(fetchTags());
        checkLoginStatus();
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleLogout = () => {
    setLoggedInStatus('NOT_LOGGED_IN');
    setUser({});
  };

  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    navigate('/');
  };
  return (
    <div>
      <NavigationBar handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home handleLogin={handleLogin} />} />
        <Route path="/signin" element={<Login handleSuccessfulAuth={handleSuccessfulAuth} />} />
        <Route path="/signup" element={<Registration handleSuccessfulAuth={handleSuccessfulAuth} />} />
        <Route exact path="/all_users" element={<AdminRoute />}>
          <Route path="/all_users" element={<AllUsers />} />
        </Route>
        <Route exact path="/my_collections" element={<PrivateRoute />}>
          <Route path="/my_collections" element={<MyCollections />} />
        </Route>
        <Route path="/collection/:id" element={<EachCollection />} />
        <Route exact path="/collection/:id/new_item" element={<PrivateRoute />}>
          <Route path="/collection/:id/new_item" element={<AddItem />} />
        </Route>
        <Route exact path="/new_collection" element={<PrivateRoute />}>
          <Route path="/new_collection" element={<AddCollection />} />
        </Route>
        <Route path="/search-result/:tagName" element={<SearchResult />} />
      </Routes>
    </div>
  );
}

export default App;
