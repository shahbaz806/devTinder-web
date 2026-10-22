import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addfeed: (state, action) => {
      return action.payload;
    },
    removeUserFeed: (state, action) => {
      const newFeed = state.filter((feed)=> feed.id !== action.payload);
      return newFeed;
    }
  },
});

export const { addfeed, removeUserFeed } = feedSlice.actions;
export default feedSlice.reducer;
