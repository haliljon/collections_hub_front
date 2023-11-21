import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { current } from "@reduxjs/toolkit";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import AllUsers from "./pages/AllUsers";
import MyCollections from "./pages/MyCollections";
import EachCollection from "./pages/EachCollection";
import AddItem from "./pages/AddNewItem";
import AddCollection from "./pages/AddCollection";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./store/users";
import { fetchCollections } from "./store/collections";
import { fetchItems } from "./store/items";
import { fetchComments } from "./store/comments";
import { fetchLikes } from "./store/likes";
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN")
  const [user, setUser] = useState({})
  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN")
    setUser(data.user)
  }
  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true }).then(response => {
      if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
        setLoggedInStatus("LOGGED_IN")
        setUser(response.data.user)
      } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
        setLoggedInStatus("NOT_LOGGED_IN")
        setUser({})
      }
    }).catch(error => {
      console.log("check login error", error);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchUsers());
        dispatch(fetchCollections())
        dispatch(fetchItems())
        dispatch(fetchComments())
        dispatch(fetchLikes())
        checkLoginStatus();
      } catch (error) {
        console.log('Error fetching data', error);
      }
    }
    fetchData();
  }, [dispatch]);

  const handleLogout = () => {
    setLoggedInStatus("NOT_LOGGED_IN")
    setUser({})
  }

  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    navigate('/');
  }
  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home loggedInStatus={loggedInStatus} handleLogin={handleLogin} />} />
        <Route path="/signin" element={<Login handleSuccessfulAuth={handleSuccessfulAuth} />} />
        <Route path="/signup" element={<Registration handleSuccessfulAuth={handleSuccessfulAuth} />} />
        <Route path="/dashboard" element={<Dashboard loggedInStatus={loggedInStatus} />} />
        <Route path="/all_users" element={<AllUsers />} />
        <Route path="/my_collections" element={<MyCollections />} />
        <Route path="/collection/:id" element={<EachCollection />} />
        <Route path="/collection/:id/new_item" element={<AddItem />} />
        <Route path="/new_collection" element={<AddCollection />} />
      </Routes>
    </div>
  );
}

export default App;
