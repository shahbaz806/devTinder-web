import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addfeed: (state, action) => {
      return action.payload;
    },
    removeUserFeed: (state, action) => {
      return state.filter((feed) => feed._id !== action.payload);
    },
  },
});

export const { addfeed, removeUserFeed } = feedSlice.actions;
export default feedSlice.reducer;
