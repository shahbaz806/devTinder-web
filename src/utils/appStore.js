import {configureStore} from "@reduxjs/toolkit";
import userSlice  from "./userSlice";
import feedReducer from "./feedSlice"
import connectionReducers from "./connectionSlice";
import requestReducers from "./requestSlice";

const appStore = configureStore({
    reducer: {
        user:userSlice,
        feed: feedReducer,
        connections: connectionReducers,
        requests: requestReducers,
    },
})
export default appStore;