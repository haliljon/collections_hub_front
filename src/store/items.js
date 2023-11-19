import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    items: [],
    loading: false,
    error: null,
};

// Create a slice
const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
    },
});

// Export actions
export const { setLoading, setError, setItems, addItem } = itemSlice.actions;

// Async action to fetch items from the backend
export const fetchItems = () => async (dispatch) => {
    try {
        // Set loading state to true
        dispatch(setLoading(true));

        // Fetch data from the backend
        const response = await fetch("http://localhost:3001/items");
        const data = await response.json();

        // Set items data
        dispatch(setItems(data));
    } catch (error) {
        // Set error state if there's an error
        dispatch(setError(error.message));
    } finally {
        // Set loading state to false regardless of success or failure
        dispatch(setLoading(false));
    }
};

// Async action to add a new item
export const addNewItem = (newItem) => async (dispatch) => {
    try {
        // Set loading state to true
        dispatch(setLoading(true));

        // Send post request to backend
        const response = await fetch("http://localhost:3001/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        });
        const data = await response.json();

        // Add new item to redux store
        dispatch(addItem(data));
    } catch (error) {
        // Set error state if there's an error
        dispatch(setError(error.message));
    } finally {
        // Set loading state to false regardless of success or failure
        dispatch(setLoading(false));
    }
};

// Export reducer
export default itemSlice.reducer;