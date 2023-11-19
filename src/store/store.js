import { configureStore } from "@reduxjs/toolkit";
import collectionsReducer from "./collections";
import usersReducer from "./users";
import itemsReducer from "./items";
import commentsReducer from "./comments";

const store = configureStore({
    reducer: {
        collections: collectionsReducer,
        users: usersReducer,
        items: itemsReducer,
        comments: commentsReducer,
    },
});

export default store;
