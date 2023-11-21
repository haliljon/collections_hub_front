import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
    users: [],
    loading: false,
    error: null,
};

// Create a slice
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        }
    },
});

// Export actions
export const { setLoading, setError, setUsers } = userSlice.actions;

// Async action to fetch users from the backend
export const fetchUsers = () => async (dispatch) => {
    try {
        // Set loading state to true
        dispatch(setLoading(true));

        const response = await axios.get("http://localhost:3001/users");
        const data = await response.data;

        // Set users data
        dispatch(setUsers(data));
    } catch (error) {
        console.log('fetchUsers error', error);
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
}

// Export reducer
export default userSlice.reducer;