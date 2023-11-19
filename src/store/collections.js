// collections.js

import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    collections: [],
    loading: false,
    error: null,
};

// Create a slice
const collectionSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setCollections: (state, action) => {
            state.collections = action.payload;
        },
        addCollection: (state, action) => {
            state.collections.push(action.payload);
        },
    },
});

// Export actions
export const { setLoading, setError, setCollections, addCollection } = collectionSlice.actions;

// Async action to fetch collections from the backend
export const fetchCollections = () => async (dispatch) => {
    try {
        // Set loading state to true
        dispatch(setLoading(true));

        // Fetch data from the backend
        const response = await fetch('http://localhost:3001/collections');
        const data = await response.json();

        // Set collections data
        dispatch(setCollections(data));
    } catch (error) {
        // Set error state if there's an error
        dispatch(setError(error.message));
    } finally {
        // Set loading state to false regardless of success or failure
        dispatch(setLoading(false));
    }
};

// Async action to add a new collection
export const addNewCollection = (newCollection) => async (dispatch) => {
    try {
        // Set loading state to true
        dispatch(setLoading(true));

        // Assuming you have an API endpoint for adding new collections
        const response = await fetch('http://localhost:3001/collections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCollection),
        });

        if (response.ok) {
            const addedCollection = await response.json();

            // Add the new collection to the Redux state
            dispatch(addCollection(addedCollection));
        } else {
            // Handle error if the request is not successful
            throw new Error('Failed to add a new collection');
        }
    } catch (error) {
        // Set error state if there's an error
        dispatch(setError(error.message));
    } finally {
        // Set loading state to false regardless of success or failure
        dispatch(setLoading(false));
    }
};

export const deleteCollection = (collectionId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await fetch(`http://localhost:3001/collections/${collectionId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            dispatch(setCollections((prevState) => {
                return prevState.collections.filter((collection) => collection.id !== collectionId);
            }));
        } else {
            throw new Error('Failed to delete the collection');
        }
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export default collectionSlice.reducer;
