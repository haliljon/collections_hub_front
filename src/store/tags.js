import { createSlice } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../components/api';

const initialState = {
  tags: [],
  loading: false,
  error: null,
};

const tagSlice = createSlice({
  name: 'tags',
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
    setTags: (state, action) => ({
      ...state,
      tags: action.payload,
    }),
    addTag: (state, action) => ({
      ...state,
      tags: [...state.tags, action.payload],
    }),
  },
});

export const {
  setLoading, setError, setTags, addTag,
} = tagSlice.actions;

export const fetchTags = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(API_ENDPOINTS.TAGS);
    const data = await response.json();

    dispatch(setTags(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addNewTag = (newTag) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await fetch(API_ENDPOINTS.TAGS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTag),
    });

    if (response.ok) {
      const addedTag = await response.json();
      dispatch(addTag(addedTag));
    } else {
      throw new Error('Failed to add a new tag');
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default tagSlice.reducer;
