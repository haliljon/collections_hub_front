import { configureStore } from "@reduxjs/toolkit";
import collectionsReducer from "./collections";
import usersReducer from "./users";
import itemsReducer from "./items";
import commentsReducer from "./comments";
import likesReducer from './likes'
import tagsReducer from './tags'

const store = configureStore({
    reducer: {
        collections: collectionsReducer,
        users: usersReducer,
        items: itemsReducer,
        comments: commentsReducer,
        likes: likesReducer,
        tags: tagsReducer
    },
});

export default store;
