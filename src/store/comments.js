import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    comments: [],
    loading: false,
    error: null,
};

// Create a slice
const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        addComment: (state, action) => {
            state.comments.push(action.payload);
        },
    },
});

// Export actions
export const { setLoading, setError, setComments, addComment } = commentSlice.actions;

// Async action to fetch comments from the backend
export const fetchComments = () => async (dispatch) => {
    try {
        // Set loading state to true
        dispatch(setLoading(true));

        // Fetch data from the backend
        const response = await fetch("http://localhost:3001/comments");
        const data = await response.json();

        // Set comments data
        dispatch(setComments(data));
    } catch (error) {
        // Set error state if there's an error
        dispatch(setError(error.message));
    } finally {
        // Set loading state to false regardless of success or failure
        dispatch(setLoading(false));
    }
};

// Async action to add a new comment    
export const addNewComment = (newComment) => async (dispatch) => {
    try {
        // Set loading state to true
        dispatch(setLoading(true));

        // Send post request to backend
        const response = await fetch("http://localhost:3001/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        });
        const data = await response.json();

        // Add new comment to Redux store
        dispatch(addComment(data));
        return data;
    } catch (error) {
        // Set error state if there's an error
        dispatch(setError(error.message));
    } finally {
        // Set loading state to false regardless of success or failure
        dispatch(setLoading(false));
    }
};

// Export reducer
export default commentSlice.reducer;