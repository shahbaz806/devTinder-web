import {configureStore} from "@reduxjs/toolkit";
import userSlice  from "./userSlice";
import feedReducer from "./feedSlice"
import connectionReducers from "./connectionSlice";

const appStore = configureStore({
    reducer: {
        user:userSlice,
        feed: feedReducer,
        connections: connectionReducers,
    },
})
export default appStore;