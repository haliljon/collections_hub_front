// likes.js

import { createSlice } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../components/api';

// Initial state
const initialState = {
    likes: [],
    loading: false,
    error: null,
};

// Create a slice
const likeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLikes: (state, action) => {
            state.likes = action.payload;
        },
        addLike: (state, action) => {
            state.likes.push(action.payload);
        },
        removeLike: (state, action) => {
            state.likes = state.likes.filter((like) => like.id !== action.payload);
        },
    },
});

// Export actions
export const { setLoading, setError, setLikes, addLike, removeLike } = likeSlice.actions;

// Async action to fetch likes from the backend
export const fetchLikes = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        // Fetch data from the backend for likes
        const response = await fetch(API_ENDPOINTS.LIKES);
        const data = await response.json();

        dispatch(setLikes(data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

// Async action to add a new like
export const addNewLike = (newLike) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await fetch(API_ENDPOINTS.LIKES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLike),
        });

        if (response.ok) {
            const addedLike = await response.json();
            dispatch(addLike(addedLike));
        } else {
            throw new Error('Failed to add a new like');
        }
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

// Async action to remove a like
export const deleteLike = (likeId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await fetch(`${API_ENDPOINTS.LIKES}/${likeId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(removeLike(likeId));
        } else {
            throw new Error('Failed to remove the like');
        }
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export default likeSlice.reducer;
