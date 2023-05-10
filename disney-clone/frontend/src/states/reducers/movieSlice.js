import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imgUrl: '',
  desc: '',
  title: '',
  date: '',
  isAdult: false,
  view: 0,
  bg: '',
  vote: '',
  language: '',
  liked: false,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {value:initialState},
  reducers: {
    getDetails: (state, action) => {
      state.value = action.payload;
    },
    returnDetail: (state) => {
      state.value.liked = true;
    }
  }
});

export const { getDetails, returnDetail } = movieSlice.actions;

export default movieSlice.reducer;
