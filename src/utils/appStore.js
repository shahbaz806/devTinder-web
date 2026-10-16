import {configureStore} from "@reduxjs/toolkit";
import userSlice  from "./userSlice";
import feedReducer from "./feedSlice"

const appStore = configureStore({
    reducer: {
        user:userSlice,
        feed: feedReducer,
    },
})
export default appStore;