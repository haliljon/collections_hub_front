import { createSlice } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../components/api';

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Create a slice
const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),

    setError: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    setItems: (state, action) => ({
      ...state,
      items: action.payload,
    }),

    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => ({
      ...state,
      items: state.items.filter((item) => item.id !== action.payload),
    }),

  },
});

// Export actions
export const {
  setLoading, setError, setItems, addItem, removeItem,
} = itemSlice.actions;

// Async action to fetch items from the backend
export const fetchItems = () => async (dispatch) => {
  try {
    // Set loading state to true
    dispatch(setLoading(true));

    // Fetch data from the backend
    const response = await fetch(API_ENDPOINTS.ITEMS);
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
    const response = await fetch(API_ENDPOINTS.ITEMS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();

    // Add new item to redux store
    dispatch(addItem(data));
    return data;
  } catch (error) {
    // Set error state if there's an error
    dispatch(setError(error.message));
    return undefined;
  } finally {
    // Set loading state to false regardless of success or failure
    dispatch(setLoading(false));
  }
};

export const deleteItem = (ItemId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(`${API_ENDPOINTS.ITEMS}/${ItemId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      dispatch(removeItem(ItemId));
    } else {
      throw new Error('Failed to delete the item');
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Export reducer
export default itemSlice.reducer;
