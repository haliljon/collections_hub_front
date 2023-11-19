import { configureStore } from "@reduxjs/toolkit";
import collectionsReducer from "./collections";
import usersReducer from "./users";
import itemsReducer from "./items";

const store = configureStore({
    reducer: {
        collections: collectionsReducer,
        users: usersReducer,
        items: itemsReducer,
    },
});

export default store;
